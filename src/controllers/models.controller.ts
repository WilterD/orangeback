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

export const getModels = async (
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
      text: 'SELECT * FROM models'
    })
    if (isEmpty.rowCount === 0) {
      return res.status(STATUS.OK).json([])
    }
    const response = await pool.query({
      text: 'SELECT * FROM models ORDER BY model_id LIMIT $1 OFFSET $2',
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

export const getModelsById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM models WHERE model_id = $1',
      values: [req.params.modelId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.modelId}`,
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

const getModelsCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    modelId,
    brand,
    description,
    modelKg,
    modelYear,
    seatsQuantity,
    refrigerantType,
    engineOilType,
    oilBox,
    octane
  } = req.body
  const newModel = [
    modelId,
    brand,
    description,
    modelKg,
    modelYear,
    seatsQuantity,
    refrigerantType,
    engineOilType,
    oilBox,
    octane
  ]
  return newModel
}

export const addModel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newModel = getModelsCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO models (  model_id, brand, description, model_kg, model_year, seats_quantity, refrigerant_type, engine_oil_type, oil_box, octane) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING model_id',
      values: newModel
    })
    const insertedId: string = insertar.rows[0].model_id
    const response = await pool.query({
      text: 'SELECT * FROM models WHERE model_id = $1',
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

const getModelsUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    brand,
    description,
    modelKg,
    modelYear,
    seatsQuantity,
    refrigerantType,
    engineOilType,
    oilBox,
    octane
  } = req.body

  const updateModel = [
    brand,
    description,
    modelKg,
    modelYear,
    seatsQuantity,
    refrigerantType,
    engineOilType,
    oilBox,
    octane
  ]
  return updateModel
}

export const updateModel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updateModel = getModelsUpdateDataFromRequestBody(req)
    updateModel.push(req.params.modelId)
    const response = await pool.query({
      text: 'UPDATE models SET brand = $1, description = $2, model_kg = $3,model_year = $4, seats_quantity = $5, refrigerant_type = $6, engine_oil_type = $7, oil_box = $8, octane = $9 WHERE model_id = $10',
      values: updateModel
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.modelId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Modelo modificado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteModel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM models WHERE model_id = $1',
      values: [req.params.modelId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.modelId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Modelo eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
