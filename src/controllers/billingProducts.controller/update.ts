import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getBillingProductUpdateDataFromRequestBody = (req: Request): any[] => {
  const { quantity } = req.body

  const updatedbillingProduct = [quantity]
  return updatedbillingProduct
}

export const updateBillingProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedbillingProduct = getBillingProductUpdateDataFromRequestBody(req)
    const response = await pool.query({
      text: `
        UPDATE products_in_order_details 
        SET quantity = $1
        WHERE 
          service_id = $2 AND
          activity_id = $3 AND
          order_id = $4 AND
          product_id = $5
      `,
      values: [
        ...updatedbillingProduct,
        req.params.serviceId,
        req.params.activityId,
        req.params.orderId,
        req.params.productId
      ]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el producto de id: ${req.params.productId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res
      .status(STATUS.OK)
      .json({ message: 'Producto Modificado Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
