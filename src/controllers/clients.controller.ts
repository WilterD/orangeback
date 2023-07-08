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

    const { rows } = await pool.query({
      text: 'SELECT COUNT(*) FROM clients'
    })

    const response = await pool.query({
      text: 'SELECT * FROM clients ORDER BY name LIMIT $1 OFFSET $2',
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

export const getClientById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM clients WHERE client_dni = $1',
      values: [req.params.clientDni]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.clientDni}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
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
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
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
    updatedClient.push(req.params.clientDni)
    const response = await pool.query({
      text: 'UPDATE clients SET name = $1, email = $2, main_phone = $3, secondary_phone = $4 WHERE client_dni = $5',
      values: updatedClient
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.clientDni}`,
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
      values: [req.params.clientDni]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.clientDni}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Cliente Eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
