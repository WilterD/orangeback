import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

export const getRecommendationDataFromRequestBody = (req: Request): any[] => {
  const { serviceId, mileage, useTime } = req.body
  const newRecommendation = [serviceId, mileage, useTime]
  return newRecommendation
}

export const addRecommendation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newCity = getRecommendationDataFromRequestBody(req)

    const insertar = await pool.query({
      text: `
        INSERT INTO services_per_models (
          model_id, service_id, mileage, use_time
        ) VALUES ($1, $2, $3, $4) 
        RETURNING model_id, service_id, mileage
      `,
      values: [req.params.modelId, ...newCity]
    })
    const insertedModelId: string = insertar.rows[0].model_id
    const insertedServiceId: string = insertar.rows[0].service_id
    const insertedMileage: string = insertar.rows[0].mileage
    const response = await pool.query({
      text: `
        SELECT * 
        FROM services_per_models 
        WHERE 
          model_id = $1 AND
          service_id = $2 AND
          mileage = $3
      `,
      values: [insertedModelId, insertedServiceId, insertedMileage]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
