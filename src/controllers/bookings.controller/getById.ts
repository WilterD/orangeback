import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { StatusError } from '../../utils/responses/status-error'

export const getBookingById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const responseBooking = await pool.query({
      text: 'SELECT * FROM bookings WHERE booking_id = $1',
      values: [req.params.bookingId]
    })
    if (responseBooking.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de: ${req.params.bookingId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    const responseServices = await pool.query({
      text: 'SELECT s.service_id, s.description FROM services AS s, bookings_per_services AS bps WHERE bps.booking_id = $1 AND bps.service_id = s.service_id',
      values: [req.params.bookingId]
    })
    return res
      .status(STATUS.CREATED)
      .json({
        ...camelizeObject(responseBooking.rows[0]),
        services: camelizeObject(responseServices.rows)
      })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
