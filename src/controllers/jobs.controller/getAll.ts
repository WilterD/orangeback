import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

export const getAllJobs = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try {
    const { rows } = await pool.query({ text: 'SELECT * FROM jobs ORDER BY description' })
    return res.status(STATUS.OK).json(camelizeObject(rows))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
