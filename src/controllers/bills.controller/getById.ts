import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'
import camelizeObject from '../../utils/camelizeObject'

export const getBillById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const responseBill = await pool.query({
      text: `
        SELECT
          bill_id,
          bill_date,
          discount_value,
          total_cost,
          order_id,
          ((1 - (discount_value/100)) * total_cost) AS total_cost_final
        FROM bills 
        WHERE bill_id = $1`,
      values: [req.params.billId]
    })
    if (responseBill.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de: ${req.params.billId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(responseBill.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
