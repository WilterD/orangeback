import { Request, Response } from 'express'
import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'

export const getEmployeesQuantityServicesPerMonth = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: `
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
        ORDER BY order_count DESC
      `,
      values: [req.params.month]
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
