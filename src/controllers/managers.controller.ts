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

export const getManagers = async (
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
      text: 'SELECT COUNT(*) FROM managers'
    })

    const response = await pool.query({
      text: 'SELECT * FROM managers ORDER BY name LIMIT $1 OFFSET $2',
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

export const getManagerById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM managers WHERE manager_dni = $1',
      values: [req.params.managerDni]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.managerDni}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getManagersCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    managerDni,
    name,
    mainPhone,
    secondaryPhone,
    address,
    email
  } = req.body
  const newManager = [
    managerDni,
    name,
    mainPhone,
    secondaryPhone,
    address,
    email
  ]
  return newManager
}

export const addManager = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newManager = getManagersCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO managers (manager_dni, name, main_phone, secondary_phone, address, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING manager_dni',
      values: newManager
    })
    const insertedId: string = insertar.rows[0].manager_dni
    const response = await pool.query({
      text: 'SELECT * FROM managers WHERE manager_dni = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getManagersUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    name,
    mainPhone,
    secondaryPhone,
    address,
    email
  } = req.body

  const updatedManager = [
    name,
    mainPhone,
    secondaryPhone,
    address,
    email
  ]
  return updatedManager
}

export const updateManager = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedManager = getManagersUpdateDataFromRequestBody(req)
    updatedManager.push(req.params.managerDni)
    const response = await pool.query({
      text: 'UPDATE managers SET name = $1, main_phone = $2, secondary_phone = $3, address = $4, email = $5 WHERE manager_dni = $6',
      values: updatedManager
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.managerDni}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Encargado modificado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteManager = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM managers WHERE manager_dni = $1',
      values: [req.params.managerDni]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.managerDni}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Encargado eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
