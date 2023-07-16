import { Request, Response } from 'express'
import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { STATUS } from '../../utils/constants'

export const getFakeClients = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try {
    const { rows } = await pool.query({
      text: `SELECT c.*
      FROM clients c
      INNER JOIN bookings b ON c.client_dni = b.client_dni
      LEFT JOIN orders o ON b.booking_id = o.booking_id
      WHERE o.order_id IS NULL AND b.expiration_date < NOW()`
    })
    return res.status(STATUS.OK).json(camelizeObject(rows))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
