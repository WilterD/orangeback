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

export const getE_Specialties  = async ( 
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
      text: 'SELECT * FROM employees_specialties'
    })
    if (isEmpty.rowCount === 0) {
      return res.status(STATUS.OK).json([])
    }
    const response = await pool.query({
      text: 'SELECT * FROM employees_specialties ORDER BY employee_dni, gitservice_id LIMIT $1 OFFSET $2',
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
    console.log(error)
    return handleControllerError(error, res)
  }
}

export const getE_SpecialtiesById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM employees_specialties WHERE employee_dni = $1 AND service_id = $2',
      values: [req.params.e_spcialtyId, req.params.service_id]

    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.e_spcialtyId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    const camelizatedObject = _.mapKeys(response.rows[0], (_value, key) => {
      return _.camelCase(key)
    })
    return res.status(STATUS.OK).json(camelizatedObject)
  } catch (error: unknown) {
    console.log(req.params.e_spcialtyId)
    return handleControllerError(error, res)
  }
}

const getE_SpecialtiesDataFromRequestBody = (req: Request): any[] => {
  const {
    employee_dni,
    service_id
  } = req.body
  const newE_Specialty = [
    employee_dni,
    service_id
  ]
  return newE_Specialty
}

export const addE_Specialties = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newE_Specialty = getE_SpecialtiesDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO employees_specialties (employee_dni, service_id) VALUES ($1, $2) RETURNING employee_dni, service_id',
      values: newE_Specialty
    })
    const insertedId: string = insertar.rows[0].e_specialty_id
    const insertedServiceId: string = insertar.rows[0].service_id
    const response = await pool.query({
      text: 'SELECT * FROM employees_specialties WHERE employee_dni = $1 AND service_id = $2',
      values: [insertedId,insertedServiceId]
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


export const deleteE_Specialties = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM employees_specialties WHERE employee_dni = $1 AND service_id = $2',
      values: [req.params.e_spcialtyId, req.params.service_id]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.e_spcialtyId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Especialidad de empleado Eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
