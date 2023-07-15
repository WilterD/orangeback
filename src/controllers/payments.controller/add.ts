import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

const getPaymentsCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    billId,
    paymentId,
    cost,
    paymentDate,
    paymentMethod,
    cardNumber
  } = req.body
  const newPayment = [
    billId,
    paymentId,
    cost,
    paymentDate,
    paymentMethod,
    cardNumber
  ]
  return newPayment
}

export const addPayment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newPayment = getPaymentsCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO payments (bill_id,payment_id,cost,payment_date,payment_method,card_number) VALUES ($1,$2,$3,$4,$5,$6) RETURNING bill_id, payment_id',
      values: newPayment
    })
    const insertedBillId: string = insertar.rows[0].billId
    const insertedPaymentId: string = insertar.rows[0].paymentId
    const response = await pool.query({
      text: 'SELECT * FROM payments WHERE bill_id = $1 AND payment_id = $2',
      values: [insertedBillId, insertedPaymentId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
