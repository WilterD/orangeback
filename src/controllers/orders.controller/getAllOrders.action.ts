import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { Order } from './types'

const getAllOrders = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const orders = await executeGetAllOrders({
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      onlyWithoutBill: !!req.query?.onlyWithoutBill,
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      includeOrderId: req.query?.includeOrderId ? +req.query?.includeOrderId : null
    })
    return res.status(STATUS.OK).json(orders)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

async function executeGetAllOrders (body: GetAllOrdersOptions): Promise<Order[]> {
  const whereValues = []
  let text = 'SELECT * FROM orders ORDER BY created_at DESC'

  if (body.onlyWithoutBill) {
    let includeOrderComplement = ''
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!!body.includeOrderId && body.includeOrderId !== null) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      whereValues.push('' + body.includeOrderId)
      includeOrderComplement += 'OR o.order_id = $1'
    }

    text = `
      SELECT * FROM orders o
      WHERE NOT EXISTS (
        SELECT *
        FROM bills b
        WHERE b.order_id = o.order_id
      ) ${includeOrderComplement}
      ORDER BY created_at DESC
    `
  }

  const { rows } = await pool.query({ text, values: whereValues })
  return camelizeObject(rows) as unknown as Order[]
}

interface GetAllOrdersOptions {
  onlyWithoutBill: boolean
  includeOrderId: number | null
}

export default getAllOrders
