import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { OrderCreate } from '../../schemas/orders.schema'

export const getOrdersDataFromRequestBody = (req: Request): any[] => {
  const {
    entryTime,
    estimatedDeparture,
    bookingId,
    employeeDni,
    realDeparture,
    responsibleDni,
    responsibleName,
    activities
  } = req.body as OrderCreate
  const newOrder = [
    entryTime,
    estimatedDeparture,
    bookingId,
    employeeDni,
    (realDeparture === undefined) ? null : realDeparture,
    (responsibleDni === undefined) ? null : responsibleDni,
    (responsibleName === undefined) ? null : responsibleName
  ]
  const newActivities = activities.map((activity) => [
    +activity.serviceId,
    +activity.activityId,
    '' + activity.employeeDni
  ])
  return [newOrder, newActivities]
}

export const addOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const [newOrder, newActivities] = getOrdersDataFromRequestBody(req)

    const insertar = await pool.query({
      text: `
        INSERT INTO orders (
          entry_time, estimated_departure, booking_id, employee_dni, real_departure, responsible_dni, responsible_name
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING order_id
      `,
      values: newOrder
    })
    const insertedOrderId: string = insertar.rows[0].order_id
    for (let i = 0; i < newActivities.length; i++) {
      const temp = await pool.query({
        text: `
          SELECT
            cost_hour
          FROM
            activities
          WHERE
            service_id = $1 AND
            activity_id = $2
      `,
        values: [newActivities[i][0], newActivities[i][1]]
      })
      await pool.query({
        text: `
          INSERT INTO order_details (
            order_id, service_id, activity_id, employee_dni, cost_hour
          ) VALUES ($1, $2, $3, $4, $5)
        `,
        values: [insertedOrderId, ...newActivities[i], temp]
      })
    }
    const response = await pool.query({
      text: `
        SELECT 
          * 
        FROM orders
        WHERE order_id = $1
      `,
      values: [insertedOrderId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export default addOrder
