import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

const getBillsCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    bill_date,
    discount_value,
    total_cost,
    order_id
  } = req.body
  const newBill = [
    bill_date,
    discount_value,
    total_cost,
    order_id
  ]
  return newBill
}

export const addBill = async (
  
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newBill = getBillsCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO bills (bill_date,discount_value,total_cost,order_id) VALUES ($1,$2,$3,$4) RETURNING bill_id',
      values: newBill
    })
    const insertedId: string = insertar.rows[0].bill_id
    const response = await pool.query({
      text: 'SELECT * FROM bills WHERE bill_id = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
