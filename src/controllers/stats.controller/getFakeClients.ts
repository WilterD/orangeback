import { Request, Response } from 'express'
import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { DEFAULT_PAGE, STATUS } from '../../utils/constants'
import { PaginateSettings, paginatedItemsResponse } from '../../utils/responses'

export const getFakeClients = async (
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
          COALESCE(COUNT(*), 0) AS count
        FROM clients AS c
        INNER JOIN bookings AS b ON c.client_dni = b.client_dni
        LEFT JOIN orders AS o ON b.booking_id = o.booking_id
        WHERE 
          o.order_id IS NULL AND 
          b.expiration_date < NOW()
      `
    })

    const response = await pool.query({
      text: `
        SELECT
          c.client_dni,
          c.name,
          COUNT(DISTINCT b.booking_id) AS quantity
        FROM clients AS c
        INNER JOIN bookings AS b ON c.client_dni = b.client_dni
        LEFT JOIN orders AS o ON b.booking_id = o.booking_id
        WHERE 
          o.order_id IS NULL AND 
          b.expiration_date < NOW()
        GROUP BY c.client_dni, c.name
        ORDER BY quantity DESC
        LIMIT $1 OFFSET $2
      `,
      values: [size, offset]
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
