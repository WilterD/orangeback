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

export const getCities = async (
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
      text: 'SELECT COUNT(*) FROM cities'
    })

    const response = await pool.query({
      text: 'SELECT * FROM cities ORDER BY name LIMIT $1 OFFSET $2',
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

export const getCityById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM cities WHERE city_id = $1',
      values: [req.params.cityId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.cityId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getCitiesDataFromRequestBody = (req: Request): any[] => {
  const { name, stateId } = req.body
  const newCity = [name, stateId]
  return newCity
}

export const addCity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newCity = getCitiesDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO cities (name, state_id) VALUES ($1, $2) RETURNING city_id',
      values: newCity
    })
    const insertedId: string = insertar.rows[0].city_id
    const response = await pool.query({
      text: 'SELECT * FROM cities WHERE city_id = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const updateCity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedCity = getCitiesDataFromRequestBody(req)
    updatedCity.push(req.params.cityId)
    const response = await pool.query({
      text: 'UPDATE cities SET name = $1, state_id = $2 WHERE city_id = $3',
      values: updatedCity
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.cityId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Ciudad modificada exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteCity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM cities WHERE city_id = $1',
      values: [req.params.cityId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.cityId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Ciudad Eliminada Exitosamente exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
