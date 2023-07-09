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

export const getEmployeesCoordinateServices = async (
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
      text: 'SELECT COUNT(*) FROM employees_coordinate_services'
    })

    const response = await pool.query({
      text: 'SELECT * FROM employees_coordinate_services ORDER BY employee_dni, service_id LIMIT $1 OFFSET $2',
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

export const getEmployeeCoordinateServiceById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM employees_coordinate_services WHERE employee_dni = $1 AND service_id = $2',
      values: [req.params.employeeDni, req.params.serviceId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: 'No se pudo encontrar el registro solicitado',
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getEmployeeCoordinateServiceCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    employeeDni,
    serviceId,
    reservationTime,
    capacity
  } = req.body
  const newEmployeeCoordinatesService = [
    employeeDni,
    serviceId,
    reservationTime,
    capacity
  ]
  return newEmployeeCoordinatesService
}

export const addEmployeeCoordinateService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newEmployeeCoordinatesService = getEmployeeCoordinateServiceCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO employees_coordinate_services (employee_dni,service_id,reservation_time,capacity) VALUES ($1,$2,$3,$4) RETURNING employee_dni, service_id',
      values: newEmployeeCoordinatesService
    })
    const insertedId: string = insertar.rows[0].employee_dni
    const insertedServiceId: string = insertar.rows[0].service_id

    const response = await pool.query({
      text: 'SELECT * FROM employees_coordinate_services WHERE employee_dni = $1 AND service_id = $2',
      values: [insertedId, insertedServiceId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getEmployeeCoordinateServiceUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    reservationTime,
    capacity
  } = req.body

  const updatedEmployeeCoordinatesService = [
    reservationTime,
    capacity
  ]
  return updatedEmployeeCoordinatesService
}

export const updateEmployeeCoordinateService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedEmployeeCoordinatesService = getEmployeeCoordinateServiceUpdateDataFromRequestBody(req)
    updatedEmployeeCoordinatesService.push(req.params.employeeDni)
    updatedEmployeeCoordinatesService.push(req.params.serviceId)
    const response = await pool.query({
      text: 'UPDATE employees_coordinate_services SET reservation_time = $1, capacity = $2 WHERE employee_dni = $3 AND service_id = $4',
      values: updatedEmployeeCoordinatesService
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: 'No se pudo encontrar el registro',
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Servicio de coordinación de empleados modificado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteEmployeeCoordinateService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM employees_coordinate_services WHERE employee_dni = $1 AND service_id = $2',
      values: [req.params.employeeDni, req.params.serviceId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: 'No se pudo encontrar el registro solicitado',
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Coordinación de servicio Eliminada Exitosamente correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
