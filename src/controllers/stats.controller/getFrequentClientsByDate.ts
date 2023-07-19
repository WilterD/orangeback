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
          clients AS c
          JOIN bookings AS b ON c.client_dni = b.client_dni
          JOIN orders AS o ON b.booking_id = o.booking_id
          JOIN (
            SELECT 
              b1.client_dni,
              COUNT(o1.order_id) AS service_count,
              COALESCE(SUM(o1.order_amount), 0) AS total_amount
            FROM 
              bookings AS b1 
              JOIN orders AS o1 ON b1.booking_id = o1.booking_id
            WHERE 
              o1.real_departure BETWEEN '{}'::date AND '{}'::date
            GROUP BY 
              b1.client_dni
          ) AS services ON c.client_dni = services.client_dni
        WHERE 
          o.real_departure BETWEEN $1 AND $2
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
    console.log(error)
    return handleControllerError(error, res)
  }
}
