import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getBillingProductUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    price,
    quantity
  } = req.body

  const updatedbillingProduct = [
    price,
    quantity
  ]
  return updatedbillingProduct
}

export const updateBillingProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedbillingProduct = getBillingProductUpdateDataFromRequestBody(req)
    updatedbillingProduct.push(req.params.serviceId, req.params.activityId, req.params.orderId, req.params.productId)
    const response = await pool.query({
      text: 'UPDATE products_in_order_details SET price = $1, quantity = $2',
      values: updatedbillingProduct
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el producto de id: ${req.params.productId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Producto Modificado Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
