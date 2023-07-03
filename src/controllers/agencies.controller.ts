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

export const getAgencies = async (
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
      text: 'SELECT * FROM agencies'
    })
    if (isEmpty.rowCount === 0) {
      throw new StatusError({
        message: 'La tabla está vacía',
        statusCode: STATUS.NOT_FOUND
      })
    }
    const response = await pool.query({
      text: 'SELECT * FROM agencies ORDER BY business_name LIMIT $1 OFFSET $2',
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

export const getAgencyById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM agencies WHERE agency_rif = $1',
      values: [req.params.agencyId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de: ${req.params.agencyId}`,
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

const getAgenciesCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    agencyRif,
    businessName,
    managerDni,
    cityId
  } = req.body
  const newAgency = [
    agencyRif,
    businessName,
    managerDni,
    cityId
  ]
  return newAgency
}

export const addAgency = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newAgency = getAgenciesCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO agencies (agency_rif,business_name,manager_dni,city_id) VALUES ($1,$2,$3,$4) RETURNING agency_rif',
      values: newAgency
    })
    const insertedId: string = insertar.rows[0].agency_rif
    const response = await pool.query({
      text: 'SELECT * FROM agencies WHERE agency_rif = $1',
      values: [insertedId]
    })
    const camelizatedObject = _.mapKeys(response.rows[0], (_value, key) => {
      return _.camelCase(key)
    })
    return res.status(STATUS.CREATED).json(camelizatedObject)
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

const getAgenciesUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    businessName,
    managerDni,
    cityId
  } = req.body

  const updatedAgency = [
    businessName,
    managerDni,
    cityId
  ]
  return updatedAgency
}

export const updateAgency = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedAgency = getAgenciesUpdateDataFromRequestBody(req)
    updatedAgency.push(req.params.agencyId)
    const response = await pool.query({
      text: 'UPDATE agencies SET business_name = $1, manager_dni = $2, city_id = $3 WHERE agency_rif = $4',
      values: updatedAgency
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.agencyId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Agencia Modificada Exitosamente' })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

export const deleteAgency = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM agencies WHERE agency_rif = $1',
      values: [req.params.agencyId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.agencyId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Agencia eliminada' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
