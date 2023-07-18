/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { StatusError } from '../../utils/responses/status-error'

const getBillsCreateDataFromRequestBody = async (req: Request): Promise<any[]> => {
  const {
    orderId
  } = req.body
  const newBill = [orderId]

  return newBill
}

export const addBill = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newBill = await getBillsCreateDataFromRequestBody(req)

    const { rows: alreadyHasABill } = await pool.query({
      text: `
        SELECT COUNT(*)
        FROM bills
        WHERE order_id = $1
      `,
      values: [req.body.orderId]
    })

    if (alreadyHasABill[0].count > 0) {
      throw new StatusError({
        message: `Ya existe una orden para la reserva de id: ${req.body.orderId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }

    const insertar = await pool.query({
      text: `
        INSERT INTO bills 
          (order_id) 
        VALUES ($1) 
        RETURNING bill_id`,
      values: newBill
    })

    return res.status(STATUS.CREATED).json(camelizeObject(insertar.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
