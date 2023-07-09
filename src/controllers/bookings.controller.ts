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

interface BookingData {
  expirationDate: string
  clientDni: string
  licensePlate: string
  servicesIds: number[]
}

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
