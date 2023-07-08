import { Request, Response } from 'express'
import { pool } from '../database'
import { DEFAULT_PAGE, STATUS } from '../utils/constants'
import {
  PaginateSettings,
  paginatedItemsResponse
} from '../utils/responses'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'
import camelizeObject from '../utils/camelizeObject'

export const getStates = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query

  try {
    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const { rows } = await pool.query({
      text: 'SELECT COUNT(*) FROM states'
    })

    const response = await pool.query({
      text: 'SELECT * FROM states ORDER BY name LIMIT $1 OFFSET $2',
      values: [size, offset]
    })
    const pagination: PaginateSettings = {
      total: Number(rows[0].count),
      page: Number(page),
      perPage: Number(size)
    }
    return paginatedItemsResponse(res, STATUS.OK, camelizeObject(response.rows) as any, pagination)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const getStateById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM states WHERE state_id = $1',
      values: [req.params.stateId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.stateId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getStatesDataFromRequestBody = (req: Request): any[] => {
  const { name } = req.body
  const newState = [name]
  return newState
}

export const addState = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newState = getStatesDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO states (name) VALUES ($1) RETURNING state_id',
      values: newState
    })
    const insertedId: string = insertar.rows[0].state_id
    const response = await pool.query({
      text: 'SELECT * FROM states WHERE state_id = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const updateState = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedState = getStatesDataFromRequestBody(req)
    updatedState.push(req.params.stateId)
    const response = await pool.query({
      text: 'UPDATE states SET name = $1 WHERE state_id = $2',
      values: updatedState
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.stateId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Estado modificado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteState = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM states WHERE state_id = $1',
      values: [req.params.stateId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.stateId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Estado eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
