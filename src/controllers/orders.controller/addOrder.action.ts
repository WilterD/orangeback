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
    responsibleName
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
  return newOrder
}

export const addOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newOrder = getOrdersDataFromRequestBody(req)

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
