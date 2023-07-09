import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { BookingData } from './interface'

const getBookingsDataFromRequestBody = (req: Request): [any[], number[]] => {
  const {
    expirationDate,
    clientDni,
    licensePlate,
    servicesIds
  } = req.body as BookingData
  const newBooking = [
    expirationDate,
    clientDni,
    licensePlate
  ]
  return [newBooking, servicesIds]
}

export const addBooking = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newBooking = getBookingsDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO bookings (expiration_date, client_dni, license_plate) VALUES ($1, $2, $3) RETURNING booking_id',
      values: newBooking[0]
    })
    const insertedBookingId: string = insertar.rows[0].booking_id
    for (let i = 0; i < newBooking[1].length; i++) {
      await pool.query({
        text: 'INSERT INTO bookings_per_services (service_id, booking_id) VALUES ($1, $2)',
        values: [newBooking[1][i], insertedBookingId]
      })
    }
    const responseBooking = await pool.query({
      text: 'SELECT * FROM bookings WHERE booking_id = $1',
      values: [insertedBookingId]
    })
    const responseServices = await pool.query({
      text: 'SELECT s.service_id, s.description FROM services AS s, bookings_per_services AS bps WHERE bps.booking_id = $1 AND bps.service_id = s.service_id',
      values: [insertedBookingId]
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
