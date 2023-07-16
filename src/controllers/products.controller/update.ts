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
      text: 'UPDATE products SET business_name = $1, manager_dni = $2, city_id = $3 WHERE agency_rif = $4',
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
