import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

export const deleteRecommendation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: `
        DELETE FROM services_per_models 
        WHERE 
          model_id = $1 AND
          service_id = $2 AND
          mileage = $3
      `,
      values: [req.params.modelId, req.params.serviceId, req.params.mileage]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: 'No se pudo encontrar el registro',
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Servicio recomendado eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
