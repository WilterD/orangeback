import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getProductsUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    shortNameProduct,
    description,
    provider,
    isEcological,
    price,
    supplyLineId
  } = req.body

  const updatedProduct = [
    shortNameProduct,
    description,
    provider,
    isEcological,
    price,
    supplyLineId
  ]
  return updatedProduct
}

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedProduct = getProductsUpdateDataFromRequestBody(req)
    updatedProduct.push(req.params.productId)
    const response = await pool.query({
      text: 'UPDATE products SET short_name_product = $1, description = $2, provider = $3, is_ecological = $4, price = $5, supply_line_id = $6 WHERE product_id = $7',
      values: updatedProduct
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
