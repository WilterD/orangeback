import { Response } from 'express'
import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'

export const getBestSellingProducts = async (
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: `SELECT 
      p.product_id, 
      p.short_name_product, 
      p.price, 
      SUM(pod.quantity) AS total_quantity_sold
  FROM 
      products p
      INNER JOIN products_in_order_details pod ON p.product_id = pod.product_id
      INNER JOIN order_details od ON pod.service_id = od.service_id AND pod.activity_id = od.activity_id
      INNER JOIN activities a ON od.service_id = a.service_id AND od.activity_id = a.activity_id
      INNER JOIN services s ON a.service_id = s.service_id
  GROUP BY 
      p.product_id, 
      p.short_name_product, 
      p.price
  ORDER BY 
      total_quantity_sold DESC;`
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: 'No se pudo encontrar el registro solicitado',
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
