import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'
import { handleControllerError } from '../../utils/responses/handleControllerError'
// import camelizeObject from '../utils/camelizeObject'
import {
  RecommendedServicesCreatePayload,
  ModelUpdate,
  ModelUpdatePayload
} from '../../schemas/models.schema'

const getModelsUpdateDataFromRequestBody = (
  req: Request
): [ModelUpdatePayload, RecommendedServicesCreatePayload[] | undefined] => {
  const {
    brand,
    description,
    modelKg,
    modelYear,
    seatsQuantity,
    refrigerantType,
    engineOilType,
    oilBox,
    octane,
    services
  } = req.body as ModelUpdate
  const newModel = [
    brand,
    description,
    modelKg,
    modelYear,
    seatsQuantity,
    refrigerantType,
    engineOilType,
    oilBox,
    octane
  ] as ModelUpdatePayload
  const newRecommendedServices = services?.map(
    (recommendedServices) =>
      [
        +recommendedServices.serviceId,
        +recommendedServices.mileage,
        +recommendedServices.useTime
      ] as RecommendedServicesCreatePayload
  )
  return [newModel, newRecommendedServices]
}

export const updateModel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updateModel = getModelsUpdateDataFromRequestBody(req)
    const response = await pool.query({
      text: 'UPDATE models SET brand = $1, description = $2, model_kg = $3,model_year = $4, seats_quantity = $5, refrigerant_type = $6, engine_oil_type = $7, oil_box = $8, octane = $9 WHERE model_id = $10',
      values: [...updateModel, req.params.modelId]
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
