import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { pool } from '../database'
import { DEFAULT_PAGE, STATUS } from '../utils/constants'
import {
  PaginateSettings,
  paginatedItemsResponse
} from '../utils/responses'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'
import { AUTH_ROUNDS } from '../config'
import _ from 'lodash'

export const getAdmins = async (
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
      text: 'SELECT * FROM admins'
    })
    if (isEmpty.rowCount === 0) {
      return res.status(STATUS.OK).json([])
    }
    const response = await pool.query({
      text: 'SELECT admin_id, name, email FROM admins ORDER BY name LIMIT $1 OFFSET $2',
      values: [size, offset]
    })
    const pagination: PaginateSettings = {
      total: response.rowCount,
      page: Number(page),
      perPage: Number(size)
    }
    const camelizatedObjectArray = _.map(response.rows, (item) => {
      return _.mapKeys(item, (_value, key) => {
        return _.camelCase(key)
      })
    })
    return paginatedItemsResponse(res, STATUS.OK, camelizatedObjectArray, pagination)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const getAdminById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT admin_id, name, email FROM admins WHERE admin_id = $1',
      values: [req.params.adminId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.adminId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    const camelizatedObject = _.mapKeys(response.rows[0], (_value, key) => {
      return _.camelCase(key)
    })
    return res.status(STATUS.OK).json(camelizatedObject)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getAdminsDataFromRequestBody = async (req: Request): Promise<any[]> => {
  const { name, email, password } = req.body
  const passwordHash = await bcrypt.hash(password, Number(AUTH_ROUNDS))
  const newAdmin = [name, email, passwordHash]
  return newAdmin
}

export const addAdmin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newAdmin = await getAdminsDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO admins (name, email, password) VALUES ($1, $2, $3) RETURNING admin_id',
      values: newAdmin
    })
    const insertedId: string = insertar.rows[0].admin_id
    const response = await pool.query({
      text: 'SELECT * FROM admins WHERE admin_id = $1',
      values: [insertedId]
    })
    const camelizatedObject = _.mapKeys(response.rows[0], (_value, key) => {
      return _.camelCase(key)
    })
    return res.status(STATUS.CREATED).json(camelizatedObject)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const updateAdmin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedAdmin = await getAdminsDataFromRequestBody(req)
    updatedAdmin.push(req.params.adminId)
    const response = await pool.query({
      text: 'UPDATE admins SET name = $1, email = $2, password = $3 WHERE admin_id = $4',
      values: updatedAdmin
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.adminId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Administrador modificado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteAdmin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM admins WHERE admin_id = $1',
      values: [req.params.adminId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.adminId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Administrador eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
