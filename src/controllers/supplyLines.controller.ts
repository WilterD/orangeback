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

export const getSupplyLines = async (
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
      text: 'SELECT COUNT(*) FROM supply_lines'
    })

    const response = await pool.query({
      text: 'SELECT * FROM supply_lines ORDER BY name LIMIT $1 OFFSET $2',
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

export const getSupplyLineById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM supply_lines WHERE supply_line_id = $1',
      values: [req.params.supplyLineId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.supplyLineId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getSupplyLinesDataFromRequestBody = (req: Request): any[] => {
  const { name } = req.body
  const newSupplyLine = [name]
  return newSupplyLine
}

export const addSupplyLine = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newSupplyLine = getSupplyLinesDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO supply_lines (name) VALUES ($1) RETURNING supply_line_id',
      values: newSupplyLine
    })
    const insertedId: string = insertar.rows[0].supply_line_id
    const response = await pool.query({
      text: 'SELECT * FROM supply_lines WHERE supply_line_id = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const updateSupplyLine = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedState = getSupplyLinesDataFromRequestBody(req)
    updatedState.push(req.params.supplyLineId)
    const response = await pool.query({
      text: 'UPDATE supply_lines SET name = $1 WHERE supply_line_id = $2',
      values: updatedState
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.supplyLineId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Línea de Producción Modificada Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteSupplyLine = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM supply_lines WHERE supply_line_id = $1',
      values: [req.params.supplyLineId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.supplyLineId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Línea de Producción Eliminada Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
