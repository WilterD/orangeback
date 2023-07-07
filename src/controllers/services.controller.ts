import { Request, Response } from 'express'
import { pool } from '../database'
import { DEFAULT_PAGE, STATUS } from '../utils/constants'
import {
  PaginateSettings,
  paginatedItemsResponse
} from '../utils/responses'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'
import _ from 'lodash'

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

    const isEmpty = await pool.query({
      text: 'SELECT * FROM services'
    })
    if (isEmpty.rowCount === 0) {
      return res.status(STATUS.OK).json([])
    }
    const response = await pool.query({
      text: 'SELECT * FROM services ORDER BY description LIMIT $1 OFFSET $2',
      values: [size, offset]
    })
    const pagination: PaginateSettings = {
      total: response.rowCount,
      page: Number(page),
      perPage: Number(size)
    }
    const camelizatedObjectArray = _.map(response.rows, (item) => {
      return _.mapKeys(item, (_value, key) => {
        return _.camelCase(key)
      })
    })
    return paginatedItemsResponse(res, STATUS.OK, camelizatedObjectArray, pagination)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const getServiceById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM services WHERE service_id = $1',
      values: [req.params.serviceId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.serviceId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    const camelizatedObject = _.mapKeys(response.rows[0], (_value, key) => {
      return _.camelCase(key)
    })
    return res.status(STATUS.OK).json(camelizatedObject)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getServicesDataFromRequestBody = (req: Request): any[] => {
  const { description } = req.body
  const newService = [description]
  return newService
}

export const addService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newService = getServicesDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO services (description) VALUES ($1) RETURNING service_id',
      values: newService
    })
    const insertedId: string = insertar.rows[0].service_id
    const response = await pool.query({
      text: 'SELECT * FROM services WHERE service_id = $1',
      values: [insertedId]
    })
    const camelizatedObject = _.mapKeys(response.rows[0], (_value, key) => {
      return _.camelCase(key)
    })
    return res.status(STATUS.CREATED).json(camelizatedObject)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const updateService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedService = getServicesDataFromRequestBody(req)
    updatedService.push(req.params.serviceId)
    const response = await pool.query({
      text: 'UPDATE services SET description = $1 WHERE service_id = $2',
      values: updatedService
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.serviceId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Servicio modificado exitosamente' })
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
    return res.status(STATUS.OK).json({ message: 'Servicio eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
