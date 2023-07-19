/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { OrderCreate } from '../../schemas/orders.schema'
import { StatusError } from '../../utils/responses/status-error'
import { dateParser } from '../../utils/dateParser'

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
    (responsibleDni === undefined) ? null : responsibleDni,
    (responsibleName === undefined) ? null : responsibleName,
    (realDeparture === undefined) ? null : realDeparture
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

    const { estimatedDeparture, realDeparture } = req.body

    const f1 = dateParser(estimatedDeparture)
    const now = new Date()
    if (realDeparture !== undefined && realDeparture !== null && realDeparture !== '') {
      const f2 = dateParser(realDeparture)
      if (now.getTime() > f2.getTime()) {
        throw new StatusError({
          message: 'La fecha real de salida no puede ser menor a la fecha actual',
          statusCode: STATUS.BAD_REQUEST
        })
      }
    }
    if (now.getTime() > f1.getTime()) {
      throw new StatusError({
        message: 'La fecha estimada de salida no puede ser menor a la fecha actual',
        statusCode: STATUS.BAD_REQUEST
      })
    }

    const { rows: alreadyHasAnOrder } = await pool.query({
      text: `
        SELECT COUNT(*)
        FROM orders
        WHERE booking_id = $1
      `,
      values: [req.body.bookingId]
    })

    if (alreadyHasAnOrder[0].count > 0) {
      throw new StatusError({
        message: `Ya existe una orden para la reserva de id: ${req.body.bookingId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }

    const insertar = await pool.query({
      text: `
        INSERT INTO orders (
          entry_time,
          estimated_departure,
          booking_id,
          employee_dni,
          responsible_dni,
          responsible_name,
          real_departure
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
        values: [insertedOrderId, ...newActivities[i], temp.rows[0].cost_hour]
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
    console.log('error concreto', error)
    return handleControllerError(error, res)
  }
}

export default addOrder
