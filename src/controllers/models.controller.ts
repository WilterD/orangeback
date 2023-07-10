import { Request, Response } from 'express'
import { pool } from '../database'
import { DEFAULT_PAGE, STATUS } from '../utils/constants'
import { PaginateSettings, paginatedItemsResponse } from '../utils/responses'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'
import camelizeObject from '../utils/camelizeObject'
import {
  ModelCreation,
  ModelCreatePayload,
  RecommendedServicesCreatePayload
} from '../schemas/models.schema'

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

    const { rows } = await pool.query({
      text: 'SELECT COUNT(*) FROM models'
    })

    const response = await pool.query({
      text: 'SELECT * FROM models ORDER BY model_id LIMIT $1 OFFSET $2',
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

export const getModelById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const responseModel = await pool.query({
      text: `
        SELECT * 
        FROM 
          models 
        WHERE 
          model_id = $1
      `,
      values: [req.params.modelId]
    })
    if (responseModel.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.modelId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    const responseService = await pool.query({
      text: `
        SELECT
          s.service_id, s.description, SUM(a.cost_hour) AS total_cost, s.created_at
        FROM
          services_per_models as spm,
          services as s,
          activities as a
        WHERE
          spm.model_id = $1 AND
          spm.service_id = s.service_id AND
          s.service_id = a.service_id
        GROUP BY
          s.service_id, s.description, s.created_at
      `,
      values: [req.params.modelId]
    })
    return res.status(STATUS.OK).json({
      ...camelizeObject(responseModel.rows[0]),
      services: camelizeObject(responseService.rows)
    })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getModelsCreateDataFromRequestBody = (
  req: Request
): [ModelCreatePayload, RecommendedServicesCreatePayload[] | undefined] => {
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
    octane,
    recommendedServices
  } = req.body as ModelCreation
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
  ] as ModelCreatePayload
  const newRecommendedServices = recommendedServices?.map(
    (recommendedServices) =>
      [
        +recommendedServices.serviceId,
        +recommendedServices.mileage,
        +recommendedServices.useTime
      ] as RecommendedServicesCreatePayload
  )
  return [newModel, newRecommendedServices]
}

export const addModel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const [modelData, newRServices] = getModelsCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: `
        INSERT INTO models (
          model_id, 
          brand, 
          description, 
          model_kg, 
          model_year, 
          seats_quantity, 
          refrigerant_type, 
          engine_oil_type, 
          oil_box, 
          octane
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING model_id
      `,
      values: modelData
    })
    const insertedModelId: string = insertar.rows[0].model_id

    if (newRServices !== undefined) {
      for (let i = 0; i < newRServices.length; i++) {
        await createRServiceForModel(newRServices[i], insertedModelId)
      }
    }

    const responseModel = await pool.query({
      text: 'SELECT * FROM models WHERE model_id = $1',
      values: [insertedModelId]
    })
    const responseServices = await pool.query({
      text: `
        SELECT
          s.service_id, s.description, SUM(a.cost_hour) AS total_cost, s.created_at
        FROM
          services_per_models as spm,
          services as s,
          activities as a
        WHERE
          spm.model_id = $1 AND
          spm.service_id = s.service_id AND
          s.service_id = a.service_id
        GROUP BY
          s.service_id, s.description, s.created_at
      `,
      values: [insertedModelId]
    })
    return res
      .status(STATUS.CREATED)
      .json({
        ...camelizeObject(responseModel.rows[0]),
        recommendedServices: camelizeObject(responseServices.rows)
      })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

async function createRServiceForModel (
  payload: RecommendedServicesCreatePayload,
  insertedModelId: string
): Promise<void> {
  await pool.query({
    text: `
      INSERT INTO services_per_models (
        service_id,
        mileage,
        use_time,
        model_id
      ) VALUES ($1, $2, $3, $4)
    `,
    values: [...payload, insertedModelId]
  })
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
    return res
      .status(STATUS.OK)
      .json({ message: 'Modelo modificado exitosamente' })
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
    return res
      .status(STATUS.OK)
      .json({ message: 'Modelo eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
