import { Request, Response } from 'express'
import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { STATUS } from '../../utils/constants'

export const getAllCities = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let whereComplement = ''
  const whereValues = []
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (req.query?.stateId != null && req.query?.stateId !== '') {
    whereValues.push(req.query.stateId)
    whereComplement += 'WHERE state_id = $1'
  }

  try {
    const { rows } = await pool.query({
      text: `SELECT * FROM cities ${whereComplement} ORDER BY name`,
      values: whereValues
    })
    return res.status(STATUS.OK).json(camelizeObject(rows))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
