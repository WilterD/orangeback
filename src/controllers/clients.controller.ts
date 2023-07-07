import { Request, Response } from 'express'
import { pool } from '../database'
import { DEFAULT_PAGE, STATUS } from '../utils/constants'
import {
  PaginateSettings,
  paginatedItemsResponse
} from '../utils/responses'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'
import _ from 'lodash'

export const getClients = async (
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
      text: 'SELECT * FROM clients'
    })
    if (isEmpty.rowCount === 0) {
      return res.status(STATUS.OK).json([])
    }
    const response = await pool.query({
      text: 'SELECT * FROM clients ORDER BY name LIMIT $1 OFFSET $2',
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

export const getClientById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM clients WHERE client_dni = $1',
      values: [req.params.clientId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.clientId}`,
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

const getClientsDataFromRequestBody = (req: Request): any[] => {
  const {
    clientDni,
    name,
    email,
    mainPhone,
    secondaryPhone
  } = req.body
  const newClient = [
    clientDni,
    name,
    email,
    mainPhone,
    secondaryPhone
  ]
  return newClient
}

export const addClient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newClient = getClientsDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO clients (client_dni, name, email, main_phone, secondary_phone) VALUES ($1, $2, $3, $4, $5) RETURNING client_dni',
      values: newClient
    })
    const insertedId: string = insertar.rows[0].client_dni
    const response = await pool.query({
      text: 'SELECT * FROM clients WHERE client_dni = $1',
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

const getClientsUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    name,
    email,
    mainPhone,
    secondaryPhone
  } = req.body

  const updatedClient = [
    name,
    name,
    email,
    mainPhone,
    secondaryPhone
  ]
  return updatedClient
}

export const updateClient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedClient = getClientsUpdateDataFromRequestBody(req)
    updatedClient.push(req.params.clientId)
    const response = await pool.query({
      text: 'UPDATE clients SET name = $1, email = $2, main_phone = $3, secondary_phone = $4 WHERE client_dni = $5',
      values: updatedClient
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.clientId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }

    return res.status(STATUS.OK).json({ message: 'Cliente modificado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteClient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM clients WHERE client_dni = $1',
      values: [req.params.clientId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.clientId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Cliente Eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
