import { Request, Response } from 'express'
import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { STATUS } from '../../utils/constants'

export const getAllEmployeesByAgencyAndService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { rows } = await pool.query({
      text: `
        SELECT * 
        FROM
          employees AS e,
          
        ORDER BY name
      `,
      values: [req.body.agencyRif, req.body.serviceId]
    })
    return res.status(STATUS.OK).json(camelizeObject(rows))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
