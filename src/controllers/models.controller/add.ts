import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import {
  ModelCreation,
  ModelCreatePayload,
  RecommendedServicesCreatePayload
} from '../../schemas/models.schema'

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
    services
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
  const newRecommendedServices = services?.map(
    (service) =>
      [
        +service.serviceId,
        +service.mileage,
        +service.useTime
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
          s.service_id, 
          s.description, 
          SUM(a.cost_hour) AS total_cost,
          spm.mileage,
          spm.use_time
        FROM
          services_per_models as spm,
          services as s,
          activities as a
        WHERE
          spm.model_id = $1 AND
          spm.service_id = s.service_id AND
          s.service_id = a.service_id
        GROUP BY
          s.service_id, s.description, spm.mileage, spm.use_time
      `,
      values: [insertedModelId]
    })
    return res
      .status(STATUS.CREATED)
      .json({
        ...camelizeObject(responseModel.rows[0]),
        services: camelizeObject(responseServices.rows)
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
