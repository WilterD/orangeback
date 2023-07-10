import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'

export default async function getServiceById (serviceId: number): Promise<Service> {
  const responseService = await pool.query({
    text: `
      SELECT 
        s.service_id, s.description, SUM(a.cost_hour) AS total_cost, s.created_at 
      FROM 
        services AS s, 
        activities AS a 
      WHERE 
        s.service_id = a.service_id AND 
        s.service_id = $1 
      GROUP BY 
        s.service_id, s.description, s.created_at
    `,
    values: [serviceId]
  })

  if (responseService.rowCount === 0) {
    throw new StatusError({
      message: `No se pudo encontrar el registro de id: ${serviceId}`,
      statusCode: STATUS.NOT_FOUND
    })
  }

  const responseActivities = await pool.query({
    text: `
      SELECT 
        a.activity_id, a.description, a.cost_hour, a.created_at, COUNT(od.order_id) as total_orders 
      FROM 
        activities a 
      LEFT JOIN order_details od 
      ON a.service_id = od.service_id AND 
      a.activity_id = od.activity_id 
      WHERE 
        a.service_id = $1 
      GROUP BY 
        a.activity_id, a.description, a.cost_hour, a.created_at
    `,
    values: [serviceId]
  })
  const responseBookings = await pool.query({
    text: `
      SELECT 
        b.booking_id, b.expedition_date, b.expiration_date, b.client_dni, b.license_plate, b.created_at 
      FROM 
        bookings_per_services as bps, bookings as b 
      WHERE 
        bps.service_id = $1 AND 
        bps.booking_id = b.booking_id
    `,
    values: [serviceId]
  })
  const responseModels = await pool.query({
    text: `
      SELECT
        m.model_id, m.brand, m.description, m.model_year
      FROM
        services_per_models as spm, models as m
      WHERE
        spm.service_id = $1 AND
        spm.model_id = m.model_id
    `,
    values: [serviceId]
  })

  return {
    ...camelizeObject(responseService.rows[0]) as unknown as Service,
    activities: camelizeObject(responseActivities.rows) as Activity[],
    bookings: camelizeObject(responseBookings.rows) as Booking[],
    models: camelizeObject(responseModels.rows) as Model[]
  }
}

export interface Service {
  serviceId: number
  description: string
  totalCost: number
  createdAt: string
  activities: Activity[]
  bookings: Booking[]
  models: Model[]
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

interface Model {
  modelId: number
  brand: string
  description: string
  modelYear: string
}
