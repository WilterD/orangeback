import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getProductPerAgencyUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    onStock,
    maxCapacity,
    minCapacity
  } = req.body

  const updatedProductPerAgency = [
    onStock,
    maxCapacity,
    minCapacity
  ]
  return updatedProductPerAgency
}

export const updatedProductPerAgency = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedProductPerAgency = getProductPerAgencyUpdateDataFromRequestBody(req)
    updatedProductPerAgency.push(req.params.productId, req.params.agencyId)
    const response = await pool.query({
      text: 'UPDATE products_per_agencies SET on_stock = $1, max_capacity = $2, min_capacity = $3 WHERE product_id = $4 AND agency_rif = $5',
      values: updatedProductPerAgency
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el producto ${req.params.productId} $ en la agencia:  ${req.params.agencyId} o la agencia/producto es inexistente`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Producto en agencia Modificada Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
