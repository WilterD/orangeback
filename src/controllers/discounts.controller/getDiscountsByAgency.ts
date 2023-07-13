import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { StatusError } from '../../utils/responses/status-error'


export const getDiscountByAgencyRif = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const response = await pool.query({
        text: 'SELECT * FROM discounts WHERE agency_rif = $1',
        values: [req.params.agencyRif]
      })
      if (response.rowCount === 0) {
        throw new StatusError({
          message: `No se pudo encontrar el registro de id: ${req.params.agencyRif}`,
          statusCode: STATUS.NOT_FOUND
        })
      }
      return res.status(STATUS.OK).json(camelizeObject(response.rows))
    } catch (error: unknown) {
      return handleControllerError(error, res)
    }
  }