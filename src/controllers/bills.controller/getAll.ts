import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

export const getAllBills = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try {
    const { rows } = await pool.query({
      text: `
        SELECT
          c.client_dni,
          c.name,
          b.*
        FROM 
          bills AS b,
          orders AS o,
          bookings AS bk,
          clients AS c
        WHERE
          b.order_id = o.order_id AND
          o.booking_id = bk.booking_id AND
          bk.client_dni = c.client_dni
      `
    })
    return res.status(STATUS.OK).json(camelizeObject(rows))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
