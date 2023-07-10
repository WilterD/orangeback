import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { StatusError } from '../../utils/responses/status-error'

export const getBillById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM bills WHERE bill_id = $1',
      values: [req.params.billId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de: ${req.params.billId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
