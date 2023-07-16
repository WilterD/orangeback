import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'
import { handleControllerError } from '../../utils/responses/handleControllerError'

export default async function deleteOrder (
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const response = await pool.query({
      text: 'DELETE FROM orders WHERE order_id = $1',
      values: [req.params.orderId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.orderId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Orden eliminada exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
