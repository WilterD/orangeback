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

export const getServicesPerModels = async (
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
      text: 'SELECT * FROM services_per_models'
    })
    if (isEmpty.rowCount === 0) {
      return res.status(STATUS.OK).json([])
    }
    const response = await pool.query({
      text: 'SELECT * FROM services_per_models ORDER BY service_id, model_id LIMIT $1 OFFSET $2',
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

export const getServicePerModelById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM services_per_models WHERE service_id = $1 AND model_id = $2',
      values: [req.params.ServicePerModelId, req.params.ServicePerModelId2]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de: ${req.params.ServicePerModelId2}`,
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

const getServicesPerModelsCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    service_id,
    model_id,
    mileage,
    use_time
  } = req.body
  const newServicePerModel = [
    service_id,
    model_id,
    mileage,
    use_time
  ]
  return newServicePerModel
}

export const addServicePerModel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newServicePerModel = getServicesPerModelsCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO services_per_models (service_id,model_id,mileage,use_time) VALUES ($1,$2,$3,$4) RETURNING service_id',
      values: newServicePerModel
    })
    const insertedId: string = insertar.rows[0].service_id;
    const inserteId2: string = insertar.rows[0].model_id;


    const response = await pool.query({
      text: 'SELECT * FROM services_per_models WHERE service_id = $1 AND model_id = $2',
      values: [insertedId, inserteId2]
    })
    const camelizatedObject = _.mapKeys(response.rows[0], (_value, key) => {
      return _.camelCase(key)
    })
    return res.status(STATUS.CREATED).json(camelizatedObject)
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

const getServicesPerModelsUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    mileage,
    use_time
  } = req.body

  const updatedServicePerModel = [
    mileage,
    use_time
  ]
  return updatedServicePerModel
}

export const updateServicePerModel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedServicePerModel = getServicesPerModelsUpdateDataFromRequestBody(req)
    updatedServicePerModel.push(req.params.ServicePerModelId)
    updatedServicePerModel.push(req.params.ServicePerModelId2)
    const response = await pool.query({
      text: 'UPDATE services_per_models SET mileage = $1, use_time = $2 WHERE service_id = $3 AND model_id = $4',
      values: updatedServicePerModel
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de ${req.params.ServicePerModelId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Servicios Por Modelos Modificada Exitosamente' })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

export const deleteServicePerModel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM services_per_models WHERE service_id = $1 AND model_id = $2',
      values: [req.params.ServicePerModelId, req.params.ServicePerModelId2]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de ${req.params.ServicePerModelId2}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Servicios Por Modelos Eliminado Correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
