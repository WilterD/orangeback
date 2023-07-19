import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getRecommendationUpdateDataFromRequestBody = (req: Request): any[] => {
  const { useTime } = req.body
  const newRecommendation = [useTime]
  return newRecommendation
}

export const updateRecommendations = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedRecommendation =
      getRecommendationUpdateDataFromRequestBody(req)
    const response = await pool.query({
      text: `
        UPDATE services_per_models 
        SET use_time = $1 
        WHERE 
          model_id = $2 AND 
          service_id = $3 AND
          mileage = $4
      `,
      values: [
        Number(updatedRecommendation),
        req.params.modelId,
        req.params.serviceId,
        Number(req.params.mileage)
      ]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: 'No se pudo encontrar el registro',
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res
      .status(STATUS.OK)
      .json({ message: 'Servicio recomendado modificado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
