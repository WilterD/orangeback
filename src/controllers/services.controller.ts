import { Request, Response } from 'express'
import { pool } from '../database'
import { DEFAULT_PAGE, STATUS } from '../utils/constants'
import { PaginateSettings, paginatedItemsResponse } from '../utils/responses'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'
import camelizeObject from '../utils/camelizeObject'

export const getServices = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query

  try {
    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const { rows } = await pool.query({
      text: 'SELECT COUNT(*) FROM services'
    })
    if (Number(rows[0].count) === 0) {
      return res.status(STATUS.OK).json([])
    }
    const response = await pool.query({
      text: 'SELECT s.service_id, s.description, SUM(a.cost_hour) AS total_cost, s.created_at FROM services AS s, activities AS a WHERE s.service_id = a.service_id GROUP BY s.service_id, s.description, s.created_at ORDER BY description LIMIT $1 OFFSET $2',
      values: [size, offset]
    })
    const pagination: PaginateSettings = {
      total: Number(rows[0].count),
      page: Number(page),
      perPage: Number(size)
    }
    return paginatedItemsResponse(
      res,
      STATUS.OK,
      camelizeObject(response.rows) as any,
      pagination
    )
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const getServiceById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const responseService = await pool.query({
      text: 'SELECT s.service_id, s.description, SUM(a.cost_hour) AS total_cost, s.created_at FROM services AS s, activities AS a WHERE s.service_id = a.service_id AND s.service_id = $1 GROUP BY s.service_id, s.description, s.created_at',
      values: [req.params.serviceId]
    })
    if (responseService.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.serviceId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    const responseActivities = await pool.query({
      text: 'SELECT activity_id, description, cost_hour, created_at FROM activities WHERE service_id = $1',
      values: [req.params.serviceId]
    })
    return res.status(STATUS.OK).json({
      ...camelizeObject(responseService.rows[0]),
      activities: camelizeObject(responseActivities.rows)
    })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

interface Activity {
  activityId?: number
  description: string
  costHour: string
}

interface ServiceData {
  description: string
  activities: Activity[]
}

const getServicesCreateDataFromRequestBody = (
  req: Request
): [string[], string[][]] => {
  const { description, activities } = req.body as ServiceData
  const newService = [description]
  const newActivities = activities.map((activity) => [
    activity.description,
    activity.costHour
  ])
  return [newService, newActivities]
}

export const addService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newService = getServicesCreateDataFromRequestBody(req)

    const insertService = await pool.query({
      text: 'INSERT INTO services (description) VALUES ($1) RETURNING service_id',
      values: newService[0]
    })
    const insertedServiceId: string = insertService.rows[0].service_id
    for (let i = 0; i < newService[1].length; i++) {
      newService[1][i].push(insertedServiceId)
      await pool.query({
        text: 'INSERT INTO activities (description, cost_hour, service_id) VALUES ($1, $2, $3)',
        values: newService[1][i]
      })
    }
    const responseService = await pool.query({
      text: 'SELECT * FROM services WHERE service_id = $1',
      values: [insertedServiceId]
    })
    const responseActivities = await pool.query({
      text: 'SELECT * FROM activities WHERE service_id = $1',
      values: [insertedServiceId]
    })
    return res.status(STATUS.CREATED).json({
      ...camelizeObject(responseService.rows[0]),
      activities: camelizeObject(responseActivities.rows)
    })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getServicesUpdateDataFromRequestBody = (
  req: Request
): [string[], Array<Array<string | number | undefined>>] => {
  const { description, activities } = req.body as ServiceData
  const updatedService = [description]
  const updatedActivities = activities.map((activity) => [
    activity.description,
    activity.costHour,
    activity.activityId
  ])
  return [updatedService, updatedActivities]
}

export const updateService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedService = getServicesUpdateDataFromRequestBody(req)
    updatedService[0].push(req.params.serviceId)
    const responseService = await pool.query({
      text: 'UPDATE services SET description = $1 WHERE service_id = $2',
      values: updatedService[0]
    })
    if (responseService.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.serviceId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    for (let i = 0; i < updatedService[1].length; i++) {
      updatedService[1][i].push(req.params.serviceId)
      await pool.query({
        text: 'UPDATE activities SET description = $1, cost_hour = $2 WHERE activity_id = $3 AND service_id = $4',
        values: updatedService[1][i]
      })
    }
    return res
      .status(STATUS.OK)
      .json({ message: 'Servicio modificado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM services WHERE service_id = $1',
      values: [req.params.serviceId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.serviceId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res
      .status(STATUS.OK)
      .json({ message: 'Servicio eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
