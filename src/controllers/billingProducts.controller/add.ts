import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

const getBillingProductCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    serviceId,
    activityId,
    orderId,
    productId,
    price,
    quantity
  } = req.body
  const newbillingProduct = [
    serviceId,
    activityId,
    orderId,
    productId,
    price,
    quantity
  ]
  return newbillingProduct
}

export const addBillingProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newbillingProduct = getBillingProductCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO products_in_order_details (service_id, activity_id, order_id, product_id, price, quantity) VALUES ($1,$2,$3,$4,$5,$6) RETURNING service_id, activity_id, order_id, product_id',
      values: newbillingProduct
    })
    const insertedServiceId: string = insertar.rows[0].service_id
    const insertedActivityId: string = insertar.rows[1].activity_id
    const insertedOrderId: string = insertar.rows[2].order_id
    const insertedProductId: string = insertar.rows[3].product_id
    const response = await pool.query({
      text: 'SELECT * FROM products_in_order_details WHERE service_id = $1, activity_id = $2, order_id = $3, product_id = $4',
      values: [insertedServiceId, insertedActivityId, insertedOrderId, insertedProductId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
