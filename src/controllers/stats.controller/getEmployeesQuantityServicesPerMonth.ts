import { Request, Response } from 'express'
import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { DEFAULT_PAGE, STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'
import { PaginateSettings, paginatedItemsResponse } from '../../utils/responses'

export const getEmployeesQuantityServicesPerMonth = async (
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
        FROM employees e
        LEFT JOIN orders o ON e.employee_dni = o.employee_dni
        LEFT JOIN order_details od ON o.order_id = od.order_id
        WHERE 
          o.entry_time >= DATE_TRUNC('month', CAST($1 AS DATE)) AND
          o.entry_time <= (DATE_TRUNC('month', CAST($1 AS DATE)) + INTERVAL '1 month - 1 millisecond')
      `,
      values: [req.params.month]
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
          e.name AS employee_name, 
          COUNT(o.order_id) AS order_count, 
          SUM(od.hours_taken) AS service_count
        FROM employees e
        LEFT JOIN orders o ON e.employee_dni = o.employee_dni
        LEFT JOIN order_details od ON o.order_id = od.order_id
        WHERE 
          o.entry_time >= DATE_TRUNC('month', CAST($1 AS DATE)) AND
          o.entry_time <= (DATE_TRUNC('month', CAST($1 AS DATE)) + INTERVAL '1 month - 1 millisecond')
        GROUP BY e.name
        ORDER BY order_count ${req.query.orderBy}
        LIMIT $2 OFFSET $3
      `
    } else {
      throw new StatusError({
        message: 'Es necesario enviar un modo de ordenamiento en orderBy',
        statusCode: STATUS.BAD_REQUEST
      })
    }

    const response = await pool.query({
      text,
      values: [req.params.month, size, offset]
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
