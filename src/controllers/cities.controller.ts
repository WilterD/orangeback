import { Request, Response } from 'express'
import { pool } from '../database'
import { DEFAULT_PAGE, STATUS } from '../utils/constants'
import {
  PaginateSettings,
  paginatedItemsResponse
} from '../utils/responses'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'

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

    const isEmpty = await pool.query({
      text: 'SELECT * FROM cities'
    })
    if (isEmpty.rowCount === 0) {
      throw new StatusError({
        message: 'La tabla está vacía',
        statusCode: STATUS.NOT_FOUND
      })
    }
    const response = await pool.query({
      text: 'SELECT * FROM cities ORDER BY city_id LIMIT $1 OFFSET $2',
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
    return res.status(STATUS.OK).json(response.rows[0])
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
    return res.status(STATUS.CREATED).json(response.rows[0])
  } catch (error: unknown) {
    console.log(error)
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
    console.log(error)
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
    return res.status(STATUS.OK).json({ message: 'Ciudad eliminada exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
