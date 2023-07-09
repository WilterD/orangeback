import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getBookingsUpdateDataFromRequestBody = (req: Request): [any[], number[]] => {
  const {
    expirationDate,
    servicesIds
  } = req.body
  const newBooking = [
    expirationDate
  ]
  return [newBooking, servicesIds]
}

export const updateBooking = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedBooking = getBookingsUpdateDataFromRequestBody(req)
    const response = await pool.query({
      text: 'UPDATE bookings SET expiration_date = $1 WHERE booking_id = $2',
      values: [updatedBooking[0], req.params.bookingId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.bookingId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    for (let i = 0; i < updatedBooking[1].length; i++) {
      const { rows } = await pool.query({
        text: 'SELECT COUNT(*) FROM bookings_per_services WHERE service_id = $1 AND booking_id = $2',
        values: [updatedBooking[1][i], req.params.bookingId]
      })
      if (Number(rows[0].count) === 0) {
        await pool.query({
          text: 'INSERT INTO bookings_per_services (service_id, booking_id) VALUES ($1, $2)',
          values: [updatedBooking[1][i], req.params.bookingId]
        })
      }
    }
    const { rows } = await pool.query({
      text: 'SELECT service_id FROM bookings_per_services WHERE booking_id = $1',
      values: [req.params.bookingId]
    })
    const actualServices = rows.map((servicio) => servicio.service_id)
    const deleteServices: number[] = []
    actualServices.forEach((elemento) => {
      if (!updatedBooking[1].includes(elemento)) {
        deleteServices.push(elemento)
      }
    })
    console.log(deleteServices)
    if (deleteServices.length !== 0) {
      for (let i = 0; i < deleteServices.length; i++) {
        await pool.query({
          text: 'DELETE FROM bookings_per_services WHERE booking_id = $1 AND service_id = $2',
          values: [req.params.bookingId, deleteServices[i]]
        })
      }
    }
    return res.status(STATUS.OK).json({ message: 'Reserva Modificada Exitosamente' })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
