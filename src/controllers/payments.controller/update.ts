import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getPaymentsUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    cost,
    paymentDate,
    paymentMethod,
    cardNumber
  } = req.body

  const updatedPayment = [
    cost,
    paymentDate,
    paymentMethod,
    cardNumber
  ]
  return updatedPayment
}

export const updatePayment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedPayment = getPaymentsUpdateDataFromRequestBody(req)
    const billId = req.params.billId
    const paymentId = req.params.paymentId
    const response = await pool.query({
      text: 'UPDATE payments SET cost = $1, payment_date = $2, payment_method = $3, card_number = $4 WHERE bill_id = $5 AND payment_id = $6',
      values: [...updatedPayment, billId, paymentId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${billId} y ${paymentId} y no pudo ser modificado}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Pago Modificado Exitosamente' })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
