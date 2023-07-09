import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'

export default async function getServiceById (serviceId: number): Promise<Service> {
  const responseService = await pool.query({
    text: 'SELECT s.service_id, s.description, SUM(a.cost_hour) AS total_cost, s.created_at FROM services AS s, activities AS a WHERE s.service_id = a.service_id AND s.service_id = $1 GROUP BY s.service_id, s.description, s.created_at',
    values: [serviceId]
  })

  if (responseService.rowCount === 0) {
    throw new StatusError({
      message: `No se pudo encontrar el registro de id: ${serviceId}`,
      statusCode: STATUS.NOT_FOUND
    })
  }

  const responseActivities = await pool.query({
    text: 'SELECT activity_id, description, cost_hour, created_at FROM activities WHERE service_id = $1',
    values: [serviceId]
  })
  const responseBookings = await pool.query({
    text: 'SELECT b.booking_id, b.expedition_date, b.expiration_date, b.client_dni, b.license_plate, b.created_at FROM bookings_per_services as bps, bookings as b WHERE bps.service_id = $1 AND bps.booking_id = b.booking_id',
    values: [serviceId]
  })

  return {
    ...camelizeObject(responseService.rows[0]) as unknown as Service,
    activities: camelizeObject(responseActivities.rows) as Activity[],
    bookings: camelizeObject(responseBookings.rows) as Booking[]
  }
}

interface Activity {
  activityId: number
  description: string
  costHour: number
  createdAt: string
}

interface Booking {
  bookingId: number
  expeditionDate: string
  expirationDate: string
  clientDni: string
  licensePlate: string
  createdAt: string
}

export interface Service {
  serviceId: number
  description: string
  totalCost: number
  createdAt: string
  activities: Activity[]
  bookings: Booking[]
}
