/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { BookingData } from './interface'
import { StatusError } from '../../utils/responses/status-error'
import { dateParser } from '../../utils/dateParser'
import { uniq } from 'lodash'

const getBookingsDataFromRequestBody = (req: Request): [any[], number[]] => {
  const { expirationDate, clientDni, licensePlate, agencyRif, servicesIds } =
    req.body as BookingData
  const newBooking = [expirationDate, clientDni, licensePlate, agencyRif]
  return [newBooking, uniq(servicesIds)]
}

export const addBooking = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const [newBooking, servicesIds] = getBookingsDataFromRequestBody(req)

    const { expirationDate } = req.body

    const f1 = dateParser(expirationDate)
    const now = new Date()
    if (now.getTime() > f1.getTime()) {
      throw new StatusError({
        message: 'La fecha de expiración no puede ser menor a la fecha actual',
        statusCode: STATUS.BAD_REQUEST
      })
    }

    const { rows: servicesInAgency } = await pool.query({
      text: `
        SELECT
          s.service_id
        FROM
          employees as e,
          employees_coordinate_services AS ecs,
          services AS s
        WHERE
          e.agency_rif = $1 AND
          e.employee_dni = ecs.employee_dni AND
          ecs.service_id = s.service_id
      `,
      values: [req.body.agencyRif]
    })

    const haveCorrectServices = servicesIds.every((service) =>
      servicesInAgency.some((item) => item.service_id === service)
    )

    if (!haveCorrectServices) {
      throw new StatusError({
        message: `Los servicios que desea agregar a la reserva no están presentes en la agencia ${req.body.agencyRif}`,
        statusCode: STATUS.BAD_REQUEST
      })
    }

    const insertar = await pool.query({
      text: `
        INSERT INTO bookings (
          expiration_date, 
          client_dni, 
          license_plate,
          agency_rif
        ) VALUES ($1, $2, $3, $4) 
        RETURNING booking_id
      `,
      values: [...newBooking]
    })
    const insertedBookingId: string = insertar.rows[0].booking_id
    for (let i = 0; i < servicesIds.length; i++) {
      await pool.query({
        text: 'INSERT INTO bookings_per_services (service_id, booking_id) VALUES ($1, $2)',
        values: [servicesIds[i], insertedBookingId]
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
    return res.status(STATUS.CREATED).json({
      ...camelizeObject(responseBooking.rows[0]),
      services: camelizeObject(responseServices.rows)
    })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
