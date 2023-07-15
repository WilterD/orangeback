import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

export const deletePayment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM payments WHERE bill_id = $1 AND payment_id = $2',
      values: [req.params.billId,req.params.paymentId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.billId} y ${req.params.paymentId} y  no pudo ser eliminado`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Pago Eliminado Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
