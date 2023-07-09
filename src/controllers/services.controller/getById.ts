import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { StatusError } from '../../utils/responses/status-error'

export const getServiceById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const responseService = await pool.query({
      text: 'SELECT s.service_id, s.description, SUM(a.cost_hour) AS total_cost, s.created_at FROM services AS s, activities AS a WHERE s.service_id = a.service_id AND s.service_id = $1 GROUP BY s.service_id, s.description, s.created_at',
      values: [req.params.serviceId]
    })
    if (responseService.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.serviceId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    const responseActivities = await pool.query({
      text: 'SELECT activity_id, description, cost_hour, created_at FROM activities WHERE service_id = $1',
      values: [req.params.serviceId]
    })
    const responseBookings = await pool.query({
      text: 'SELECT b.booking_id, b.expedition_date, b.expiration_date, b.client_dni, b.license_plate, b.created_at FROM bookings_per_services as bps, bookings as b WHERE bps.service_id = $1 AND bps.booking_id = b.booking_id',
      values: [req.params.serviceId]
    })
    return res.status(STATUS.OK).json({
      ...camelizeObject(responseService.rows[0]),
      activities: camelizeObject(responseActivities.rows),
      bookings: camelizeObject(responseBookings.rows)
    })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
