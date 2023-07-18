import { Request, Response } from 'express'
import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'

export const getFrequentModelsDate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: `SELECT 
      m.model_id, 
      m.brand, 
      m.description, 
      COUNT(*) AS total_orders
  FROM 
      models m
      INNER JOIN services_per_models spm ON m.model_id = spm.model_id
      INNER JOIN services s ON spm.service_id = s.service_id
      INNER JOIN activities a ON s.service_id = a.service_id
      INNER JOIN order_details od ON a.service_id = od.service_id AND a.activity_id = od.activity_id
      INNER JOIN orders o ON od.order_id = o.order_id
  WHERE 
      o.entry_time BETWEEN $1 AND $2
  GROUP BY 
      m.model_id, 
      m.brand, 
      m.description
  ORDER BY 
      total_orders DESC;`,
      values: [req.params.dateInit, req.params.dateEnd]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: 'No se pudo encontrar ningun modelo en ese periodo',
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
