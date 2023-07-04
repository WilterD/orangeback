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

export const getEmployees_Coordinate_Services = async (
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
      text: 'SELECT * FROM employees_coordinate_services'
    })
    if (isEmpty.rowCount === 0) {
      return res.status(STATUS.OK).json([])
    }
    const response = await pool.query({
      text: 'SELECT * FROM employees_coordinate_services ORDER BY employee_dni, service_id LIMIT $1 OFFSET $2',
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

export const getEmployee_Coordinate_ServiceById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM employees_coordinate_services WHERE employee_dni = $1 AND service_id = $2',
      values: [req.params.coordId, req.params.serviceId ]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro solicitado`,
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

const getEmployees_Coordinate_ServicesCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    employee_dni,
    service_id,
    reservation_time,
    capacity
  } = req.body
  const newEmployee_Coordinate_Service = [
    employee_dni,
    service_id,
    reservation_time,
    capacity
  ]
  return newEmployee_Coordinate_Service
}

export const addEmployee_Coordinate_Service = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newEmployee_Coordinate_Service = getEmployees_Coordinate_ServicesCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO employees_coordinate_services (employee_dni,service_id,reservation_time,capacity) VALUES ($1,$2,$3,$4) RETURNING employee_dni, service_id',
      values: newEmployee_Coordinate_Service
    })
    const insertedId: string = insertar.rows[0].employee_dni
    const insertedServiceId: string = insertar.rows[0].service_id

    const response = await pool.query({
      text: 'SELECT * FROM employees_coordinate_services WHERE employee_dni = $1 AND service_id = $2',
      values: [insertedId, insertedServiceId]
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

const getEmployees_Coordinate_ServicesUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    reservation_time,
    capacity
  } = req.body

  const updatedEmployee_Coordinate_Service = [
    reservation_time,
    capacity
  ]
  return updatedEmployee_Coordinate_Service
}

export const updateEmployee_Coordinate_Service = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedEmployee_Coordinate_Service = getEmployees_Coordinate_ServicesUpdateDataFromRequestBody(req)
    updatedEmployee_Coordinate_Service.push(req.params.coordId)
    updatedEmployee_Coordinate_Service.push(req.params.serviceId)
    const response = await pool.query({
      text: 'UPDATE employees_coordinate_services SET reservation_time = $1, capacity = $2 WHERE employee_dni = $3 AND service_id = $4',
      values: updatedEmployee_Coordinate_Service
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Servicio de coordinación de empleados modificado exitosamente' })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

export const deleteEmployee_Coordinate_Service = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM employees_coordinate_services WHERE employee_dni = $1 AND service_id = $2',
      values: [req.params.coordId, req.params.serviceId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro solicitado`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Coordinación de servicio eliminada correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
