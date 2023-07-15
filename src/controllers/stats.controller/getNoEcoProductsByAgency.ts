import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { StatusError } from '../../utils/responses/status-error'

export const getNoEcoProductsByAgency = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: `SELECT 
      100 * SUM(CASE WHEN is_ecological = FALSE THEN on_stock ELSE 0 END) / NULLIF(SUM(on_stock), 0) AS non_ecological_percentage
    FROM 
      products_per_agencies 
      INNER JOIN products ON products_per_agencies.product_id = products.product_id
    WHERE 
    agency_rif = $1 AND
    on_stock > 0`, 
      values: [req.params.agencyRif]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de: ${req.params.agencyRif}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
