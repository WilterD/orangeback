import { Request, Response } from 'express'
import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { STATUS } from '../../utils/constants'

export const GetEmployeeWorkList = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try {
    const { rows } = await pool.query({
      text: `SELECT e.name AS employee_name, COUNT(o.order_id) AS order_count, SUM(od.hours_taken) AS service_count
      FROM employees e
      LEFT JOIN orders o ON e.employee_dni = o.employee_dni
      LEFT JOIN order_details od ON o.order_id = od.order_id
      WHERE DATE_TRUNC(month, o.entry_time) = DATE_TRUNC(month, CAST(:month AS DATE))
      GROUP BY e.name
      ORDER BY order_count DESC`
    })
    return res.status(STATUS.OK).json(camelizeObject(rows))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
