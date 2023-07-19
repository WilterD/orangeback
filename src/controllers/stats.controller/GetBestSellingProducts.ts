import { Request, Response } from 'express'
import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { DEFAULT_PAGE, STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'
import { PaginateSettings, paginatedItemsResponse } from '../../utils/responses'

export const getBestSellingProducts = async (
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
          products p
        INNER JOIN products_in_order_details pod ON p.product_id = pod.product_id
        INNER JOIN order_details od ON pod.service_id = od.service_id AND pod.activity_id = od.activity_id
        INNER JOIN activities a ON od.service_id = a.service_id AND od.activity_id = a.activity_id
        INNER JOIN services s ON a.service_id = s.service_id
      `
    })

    let text

    if (
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      req.query?.orderBy &&
      req.query?.orderBy !== null &&
      req.query?.orderBy !== 'null' &&
      req.query?.orderBy !== '' &&
      (
        req.query?.orderBy === 'ASC' ||
        req.query?.orderBy === 'DESC'
      )
    ) {
      text = `
        SELECT 
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
            total_quantity_sold ${req.query.orderBy}
        LIMIT $1 OFFSET $2
      `
    } else {
      throw new StatusError({
        message: 'Es necesario enviar un modo de ordenamiento en orderBy',
        statusCode: STATUS.BAD_REQUEST
      })
    }

    const response = await pool.query({
      text,
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
