import { Request, Response } from 'express'
import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { DEFAULT_PAGE, STATUS } from '../../utils/constants'
import { PaginateSettings, paginatedItemsResponse } from '../../utils/responses'

export const getFrequentModelsByDate = async (
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
      text: `
        SELECT 
          COUNT(*)
        FROM 
          models AS m
          INNER JOIN services_per_models AS spm ON m.model_id = spm.model_id
          INNER JOIN services AS s ON spm.service_id = s.service_id
          INNER JOIN activities AS a ON s.service_id = a.service_id
          INNER JOIN order_details AS od ON a.service_id = od.service_id AND a.activity_id = od.activity_id
          INNER JOIN orders AS o ON od.order_id = o.order_id
        WHERE 
          o.entry_time BETWEEN $1 AND $2
      `,
      values: [req.params.dateInit, req.params.dateEnd]
    })

    const response = await pool.query({
      text: `
        SELECT 
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
          total_orders DESC
          LIMIT $3 OFFSET $4
      `,
      values: [req.params.dateInit, req.params.dateEnd, size, offset]
    })

    const pagination: PaginateSettings = {
      total: Number(rows[0].count),
      page: Number(page),
      perPage: Number(size)
    }
    return paginatedItemsResponse(res, STATUS.OK, camelizeObject(response.rows) as any, pagination)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
