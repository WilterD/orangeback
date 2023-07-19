/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { StatusError } from '../../utils/responses/status-error'

const getPaymentsCreateDataFromRequestBody = (req: Request): any[] => {
  const { billId, amount, paymentDate, paymentMethod, cardNumber } = req.body
  const newPayment = [
    billId,
    amount,
    paymentDate,
    paymentMethod,
    paymentMethod === 'TD' || paymentMethod === 'TC' ? cardNumber : null
  ]
  return newPayment
}

export const addPayment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newPayment = getPaymentsCreateDataFromRequestBody(req)

    if (
      (
        req.body.paymentMethod === 'TD' ||
        req.body.paymentMethod === 'TC'
      ) && req.body.cardNumber === null
    ) {
      throw new StatusError({
        message: 'Es necesario indicar un número de tarjeta',
        statusCode: STATUS.NOT_FOUND
      })
    }

    const { rows: paymentQuantity } = await pool.query({
      text: 'SELECT COUNT(*) FROM payments WHERE bill_id = $1',
      values: [newPayment[0]]
    })

    if (Number(paymentQuantity[0].count) === 2) {
      throw new StatusError({
        message: `Se ha alcanzado el limite de pagos para la factura ${newPayment[0]}`,
        statusCode: STATUS.NOT_FOUND
      })
    }

    const insertar = await pool.query({
      text: `
        INSERT INTO payments (
          bill_id,
          amount,
          payment_date,
          payment_method,
          card_number,
          payment_id
        ) VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING bill_id
      `,
      values: [...newPayment, Number(paymentQuantity[0].count) + 1]
    })
    const insertedBillId: string = insertar.rows[0].bill_id
    const response = await pool.query({
      text: `
        SELECT * 
        FROM payments 
        WHERE 
          bill_id = $1 AND 
          payment_id = $2
      `,
      values: [insertedBillId, Number(paymentQuantity[0].count) + 1]
    })
    console.log(response)
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
