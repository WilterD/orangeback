import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

const getProductPerAgencyCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    productId,
    agencyRif,
    onStock,
    minCapacity,
    maxCapacity
  } = req.body
  const newProductPerAgency = [
    productId,
    agencyRif,
    onStock,
    minCapacity,
    maxCapacity
  ]
  return newProductPerAgency
}

export const addProductPerAgency = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newProductPerAgency = getProductPerAgencyCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: `
        INSERT INTO products_per_agencies (
          product_id, 
          agency_rif, 
          on_stock, 
          min_capacity,
          max_capacity 
        ) VALUES ($1, $2, $3, $4, $5) 
        RETURNING product_id, agency_rif
      `,
      values: newProductPerAgency
    })
    console.log(insertar)
    const insertedProductId: string = insertar.rows[0].product_id
    const insertedAgencyRif: string = insertar.rows[0].agency_rif
    const response = await pool.query({
      text: `
        SELECT * 
        FROM 
          products_per_agencies 
        WHERE 
          product_id = $1 AND 
          agency_rif = $2
      `,
      values: [insertedProductId, insertedAgencyRif]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
