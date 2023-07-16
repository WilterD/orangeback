import { Request, Response } from 'express'
import { pool } from '../../database'
import { DEFAULT_PAGE, STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import {
  PaginateSettings,
  paginatedItemsResponse
} from '../../utils/responses'
import camelizeObject from '../../utils/camelizeObject'

export const getBillingProducts = async (
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
        SELECT COUNT(*) 
        FROM products_in_order_details
      `
    })

    const response = await pool.query({
      text: `
        SELECT * 
        FROM products_in_order_details 
        ORDER BY product_id 
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
    return handleControllerError(error, res)
  }
}
