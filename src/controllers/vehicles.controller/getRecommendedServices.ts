import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { StatusError } from '../../utils/responses/status-error'

export const getRecommendedServices = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: `
        SELECT
          s.service_id, 
          s.description, 
          SUM(a.cost_hour) AS total_cost,
          spm.mileage,
          spm.use_time
        FROM
          vehicles AS v,
          services_per_models AS spm,
          services AS s,
          activities AS a
        WHERE 
          v.license_plate = $1 AND
          v.model_id = spm.model_id AND
          spm.mileage = $2 AND
          spm.service_id = s.service_id AND
          s.service_id = a.service_id
        GROUP BY
          s.service_id, s.description, spm.mileage, spm.use_time
      `,
      values: [req.params.licensePlate, req.params.mileage]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar servicios recomendados para id: ${req.params.licensePlate} con kilometraje: ${req.params.mileage}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
