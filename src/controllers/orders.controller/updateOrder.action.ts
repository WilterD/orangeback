import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { getOrdersDataFromRequestBody } from './addOrder.action'

export default async function updateOrder (
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const [updatedOrder] = getOrdersDataFromRequestBody(req)
    const response = await pool.query({
      text: `
        UPDATE orders SET 
          entry_time = $1, 
          estimated_departure = $2, 
          booking_id = $3, 
          employee_dni = $4, 
          real_departure = $5, 
          responsible_dni = $6, 
          responsible_name = $7
        WHERE order_id = $8
      `,
      values: [...updatedOrder, req.params.orderId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.managerDni}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Orden modificada exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
