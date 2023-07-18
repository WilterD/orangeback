import { Request, Response } from 'express'
import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'

export const getAgenciesEarnsMost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: `SELECT agencies.business_name AS agency_name, SUM(order_details.cost_hour * order_details.hours_taken) AS total_earnings
      FROM agencies
      JOIN employees ON agencies.agency_rif = employees.agency_rif
      JOIN orders ON employees.employee_dni = orders.employee_dni
      JOIN order_details ON orders.order_id = order_details.order_id
      WHERE orders.real_departure BETWEEN $1 AND $2
      GROUP BY agencies.business_name
      ORDER BY total_earnings DESC;`,
      values: [req.params.dateInit, req.params.dateEnd]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: 'No se pudo encontrar ningun servicio en ese periodo',
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
