import { Request, Response } from 'express'
import { pool } from '../database'
import { DEFAULT_PAGE, STATUS } from '../utils/constants'
import {
  PaginateSettings,
  paginatedItemsResponse
} from '../utils/responses'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'
import camelizeObject from '../utils/camelizeObject'

export const getBookings = async (
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
      text: 'SELECT COUNT(*) FROM bookings'
    })

    const response = await pool.query({
      text: 'SELECT * FROM bookings ORDER BY booking_id LIMIT $1 OFFSET $2',
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

export const getBookingById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM bookings WHERE booking_id = $1',
      values: [req.params.bookingId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de: ${req.params.bookingId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getBookingsDataFromRequestBody = (req: Request): any[] => {
  const {
    expirationDate,
    clientDni,
    licensePlate
  } = req.body
  const newBooking = [
    expirationDate,
    clientDni,
    licensePlate
  ]
  return newBooking
}

export const addBooking = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newBooking = getBookingsDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO bookings (expiration_date, client_dni, license_plate) VALUES ($1, $2, $3) RETURNING booking_id',
      values: newBooking
    })
    const insertedId: string = insertar.rows[0].booking_id
    const response = await pool.query({
      text: 'SELECT * FROM bookings WHERE booking_id = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getBookingsUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    expirationDate
  } = req.body
  const newBooking = [
    expirationDate
  ]
  return newBooking
}

export const updateBooking = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedBooking = getBookingsUpdateDataFromRequestBody(req)
    const response = await pool.query({
      text: 'UPDATE bookings SET expiration_date = $1 WHERE booking_id = $2',
      values: [updatedBooking, req.params.bookingId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.bookingId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Reserva Modificada Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteBooking = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM bookings WHERE booking_id = $1',
      values: [req.params.bookingId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.bookingId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Reserva Eliminada Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
