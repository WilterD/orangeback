import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { StatusError } from '../../utils/responses/status-error'

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
