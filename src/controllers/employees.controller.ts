/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express'
import { pool } from '../database'
import { DEFAULT_PAGE, STATUS } from '../utils/constants'
import {
  PaginateSettings,
  paginatedItemsResponse,
  successItemsResponse,
  successResponse
} from '../utils/responses'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'

export const getEmployees = async (
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
      text: 'SELECT * FROM employees'
    })
    if (isEmpty.rowCount === 0) {
      throw new StatusError({
        message: 'La tabla está vacía',
        statusCode: STATUS.NOT_FOUND
      })
    }
    const response = await pool.query({
      text: 'SELECT * FROM employees ORDER BY employee_dni LIMIT $1 OFFSET $2',
      values: [size, offset]
    })
    const pagination: PaginateSettings = {
      total: response.rowCount,
      currentPage: Number(page),
      perPage: Number(size)
    }
    return paginatedItemsResponse(res, STATUS.OK, response.rows, pagination)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM employees WHERE employee_dni = $1',
      values: [req.params.employeeId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.employeeId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return successResponse(res, STATUS.OK, response.rows[0])
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getEmployeesDataFromRequestBody = (req: Request): any[] => {
  const { employee_dni, name, phone, address, salary, agency_rif, job_id, created_at } = req.body
  const newEmployee = [employee_dni, name, phone, address, salary, agency_rif, job_id, created_at]
  return newEmployee
}

export const addEmployee = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newEmployee = getEmployeesDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO employees (name, phone, address, salary, agency_rif, job_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING employee_id',
      values: newEmployee
    })
    const insertedId: string = insertar.rows[0].employee_id
    const response = await pool.query({
      text: `SELECT * FROM employees WHERE employee_id = ${insertedId}`
    })
    return successItemsResponse(res, STATUS.CREATED, response.rows[0])
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedEmployee = getEmployeesDataFromRequestBody(req)
    updatedEmployee.push(req.params.employeeId)
    const response = await pool.query({
        // employee_dni, name, phone, address, salary, agency_rif, job_id, created_at
      text: 'UPDATE employees SET name = $1, phone = $2, address = $3, salary = $4, agency_rif = $5, job_id = 6$  WHERE employee_dni = $8',
      values: updatedEmployee
    })
    console.log(response)
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.employeeId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return successResponse(res, STATUS.OK, 'Employeeistrador modificado exitosamente')
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM employees WHERE employee_dni = $1',
      values: [req.params.employeeId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.employeeId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return successResponse(res, STATUS.OK, 'Empleado eliminado')
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
