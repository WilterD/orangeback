import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

const getJobsDataFromRequestBody = (req: Request): any[] => {
  const { description } = req.body
  const newJob = [description]
  return newJob
}

export const addJob = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newJob = getJobsDataFromRequestBody(req)

    const insertar = await pool.query({
      text: `INSERT INTO jobs 
      (description) 
      VALUES ($1) RETURNING job_id`,
      values: newJob
    })
    const insertedId: string = insertar.rows[0].job_id
    const response = await pool.query({
      text: `SELECT * 
              FROM jobs 
              WHERE job_id = $1`,
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
