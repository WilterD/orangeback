import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

const getProductsCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    productId,
    shortNameProduct,
    description,
    provider,
    isEcological,
    price,
    supplyLineId
  } = req.body
  const newProduct = [
    productId,
    shortNameProduct,
    description,
    provider,
    isEcological,
    price,
    supplyLineId
  ]
  return newProduct
}

export const addProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newProduct = getProductsCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO products (product_id, short_name_product , description, provider, is_ecological, price, supply_line_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING product_id',
      values: newProduct
    })
    const insertedId: string = insertar.rows[0].product_id
    const response = await pool.query({
      text: 'SELECT * FROM products WHERE product_id = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
