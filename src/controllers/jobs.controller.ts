import { Request, Response } from 'express'
import { pool } from '../database'
import { DEFAULT_PAGE, STATUS } from '../utils/constants'
import {
  PaginateSettings,
  paginatedItemsResponse
} from '../utils/responses'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'

export const getJobs = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query

  try {
    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const isEmpty = await pool.query({
      text: 'SELECT * FROM jobs'
    })
    if (isEmpty.rowCount === 0) {
      throw new StatusError({
        message: 'La tabla está vacía',
        statusCode: STATUS.NOT_FOUND
      })
    }
    const response = await pool.query({
      text: 'SELECT * FROM jobs ORDER BY job_id LIMIT $1 OFFSET $2',
      values: [size, offset]
    })
    const pagination: PaginateSettings = {
      total: response.rowCount,
      page: Number(page),
      perPage: Number(size)
    }
    return paginatedItemsResponse(res, STATUS.OK, response.rows, pagination)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const getJobById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM jobs WHERE job_id = $1',
      values: [req.params.jobId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de: ${req.params.jobId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(response.rows[0])
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getJobsDataFromRequestBody = (req: Request): any[] => {
  const {
    description
  } = req.body
  const newJob = [
    description
  ]
  return newJob
}

export const addJob = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newJob = getJobsDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO jobs (description) VALUES ($1) RETURNING job_id',
      values: newJob
    })
    const insertedId: string = insertar.rows[0].job_id
    const response = await pool.query({
      text: 'SELECT * FROM jobs WHERE job_id = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(response.rows[0])
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

export const updateJob = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedJob = getJobsDataFromRequestBody(req)
    updatedJob.push(req.params.jobId)
    const response = await pool.query({
      text: 'UPDATE jobs SET description = $1 WHERE job_id = $2',
      values: updatedJob
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.jobId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Cargo modificado exitosamente' })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

export const deleteJob = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM jobs WHERE job_id = $1',
      values: [req.params.jobId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.jobId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Cargo eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
