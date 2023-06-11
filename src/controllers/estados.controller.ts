import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../database'
import {
  PaginateSettings,
  paginatedItemsResponse,
  successItemsResponse,
  successResponse
} from '../utils/responses'
import { parseName } from '../utils/parsers'
import StatusError from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'

const STATUS_OK = 200
const STATUS_CREATED = 201
const STATUS_BAD_REQUEST = 400
const STATUS_NOT_FOUND = 404

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10

const validatePageAndSize = (
  page: any,
  size: any
): [number, number] | string => {
  let pageAsNumber: number
  let sizeAsNumber: number

  if (!isNaN(Number(page)) && Number.isInteger(Number(page))) {
    pageAsNumber = Number.parseInt(page)
    if (pageAsNumber < 1) {
      pageAsNumber = 1
    }
  } else {
    return 'La página debe ser un número entero'
  }

  if (!isNaN(Number(size)) && Number.isInteger(Number(size))) {
    sizeAsNumber = Number.parseInt(size)
    if (sizeAsNumber < 1) {
      sizeAsNumber = 1
    }
  } else {
    return 'La tamaño debe ser un número entero'
  }

  return [pageAsNumber, sizeAsNumber]
}

export const getEstados = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query
  const validatedParams = validatePageAndSize(page, size)

  try {
    if (typeof validatedParams === 'string') {
      throw new StatusError(validatedParams, STATUS_BAD_REQUEST)
    }

    const [pageAsNumber, sizeAsNumber] = validatedParams

    let offset = (pageAsNumber - 1) * sizeAsNumber

    if (pageAsNumber < 1) {
      offset = 0
    }

    const isEmpty: QueryResult = await pool.query('SELECT * FROM estados')
    if (isEmpty.rowCount === 0) {
      throw new StatusError('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response: QueryResult = await pool.query(
      'SELECT * FROM estados LIMIT $1 OFFSET $2',
      [sizeAsNumber, offset]
    )
    const pagination: PaginateSettings = {
      total: response.rowCount,
      currentPage: pageAsNumber,
      perPage: sizeAsNumber
    }
    return paginatedItemsResponse(res, STATUS_OK, response.rows, pagination)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const getEstadosById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(
      'SELECT * FROM estados WHERE id_estado = $1',
      [req.params.estadoId]
    )
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar el registro de id: ${req.params.estadoId}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows[0])
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getEstadoDataFromRequestBody = (requestBody: any): String => {
  const newEstado = parseName(requestBody.nombre)
  return newEstado
}

export const addEstados = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newEstado = getEstadoDataFromRequestBody(req.body)

    const insertar: QueryResult = await pool.query(
      'INSERT INTO estados (nombre) VALUES ($1) RETURNING id_estado',
      [newEstado]
    )
    const insertedId: string = insertar.rows[0].id_estado
    const response: QueryResult = await pool.query(
      `SELECT * FROM estados WHERE id_estado = ${insertedId}`
    )
    return successItemsResponse(res, STATUS_CREATED, response.rows[0])
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const updateEstados = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedRoom = getEstadoDataFromRequestBody(req.body)
    const response: QueryResult = await pool.query('UPDATE estados SET nombre = $1 WHERE id_estado = $2', [
      updatedRoom,
      req.params.estadoId
    ])
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar el registro de id: ${req.params.estadoId}`,
        STATUS_NOT_FOUND
      )
    }
    if (response.rowCount === 0) {
      return successResponse(
        res,
        STATUS_OK,
        'Operación PUT exitosa pero el contenido del registro no cambió'
      )
    }
    return successResponse(res, STATUS_OK, 'Estado modificado exitosamente')
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteEstados = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(
      'DELETE FROM estados WHERE id_estado = $1',
      [req.params.estadoId]
    )
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar el registro de id: ${req.params.estadoId}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'Estado eliminado')
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
