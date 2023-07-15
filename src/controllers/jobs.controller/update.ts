import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getJobsDataFromRequestBody = (req: Request): any[] => {
  const { description } = req.body
  const newJob = [description]
  return newJob
}

export const updateJob = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedJob = getJobsDataFromRequestBody(req)
    updatedJob.push(req.params.jobId)
    const response = await pool.query({
      text: `UPDATE jobs 
              SET description = $1 
              WHERE job_id = $2`,
      values: updatedJob
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.jobId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res
      .status(STATUS.OK)
      .json({ message: 'Cargo modificado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
