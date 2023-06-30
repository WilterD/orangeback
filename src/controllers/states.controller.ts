/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express'
import { pool } from '../database'
import {
  PaginateSettings,
  paginatedItemsResponse,
  successItemsResponse,
  successResponse
} from '../utils/responses'
import StatusError from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'

const STATUS_OK = 200
const STATUS_CREATED = 201
const STATUS_NOT_FOUND = 404

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10

export const getStates = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query

  try {
    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const isEmpty = await pool.query({
      text: 'SELECT * FROM states'
    })
    if (isEmpty.rowCount === 0) {
      throw new StatusError('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response = await pool.query({
      text: 'SELECT * FROM states ORDER BY state_id LIMIT $1 OFFSET $2',
      values: [size, offset]
    })
    const pagination: PaginateSettings = {
      total: response.rowCount,
      currentPage: Number(page),
      perPage: Number(size)
    }
    return paginatedItemsResponse(res, STATUS_OK, response.rows, pagination)
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
      throw new StatusError(
        `No se pudo encontrar el registro de id: ${req.params.stateId}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows[0])
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
      text: `SELECT * FROM states WHERE state_id = ${insertedId}`
    })
    return successItemsResponse(res, STATUS_CREATED, response.rows[0])
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
    console.log(response)
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar el registro de id: ${req.params.stateId}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'Estado modificado exitosamente')
  } catch (error: unknown) {
    console.log(error)
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
      throw new StatusError(
        `No se pudo encontrar el registro de id: ${req.params.stateId}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'Estado eliminado')
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
