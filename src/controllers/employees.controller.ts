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
      return res.status(STATUS.OK).json([])
    }
    const response = await pool.query({
      text: 'SELECT * FROM employees ORDER BY name LIMIT $1 OFFSET $2',
      values: [size, offset]
    })
    const pagination: PaginateSettings = {
      total: response.rowCount,
      page: Number(page),
      perPage: Number(size)
    }
    return paginatedItemsResponse(res, STATUS.OK, camelizeObject(response.rows) as any, pagination)
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
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getEmployeesDataFromRequestBody = (req: Request): any[] => {
  const {
    employeeDni,
    name,
    phone,
    address,
    salary,
    agencyRif,
    jobId,
    servicesId
  } = req.body
  const newEmployee = [
    employeeDni,
    name,
    phone,
    address,
    salary,
    agencyRif,
    jobId,
    servicesId
  ]
  return newEmployee
}

interface EmployeeData {
  employee_dni: string;
  name: string;
  phone: string;
  address: string;
  salary: number;
  agency_rif: string;
  job_id: number;
  servicesIds: number[];
}

export const addEmployee = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newEmployee: EmployeeData = getEmployeesDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO employees (employee_dni, name, phone, address, salary, agency_rif, job_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING employee_dni',
      values: [newEmployee.employee_dni, newEmployee.name, newEmployee.phone, newEmployee.address, newEmployee.salary, newEmployee.agency_rif, newEmployee.job_id]
    })
    const insertedId = insertar.rows[0].employee_dni;

    for (let i = 0; i < newEmployee.servicesIds.length; i++) {
      await pool.query({
        text: 'INSERT INTO employees_specialties (employee_dni, service_id) VALUES ($1, $2) RETURNING employee_dni, service_id',
        values: [insertedId, newEmployee.servicesIds[i]]
      });
    }

    const response = await pool.query({
      text: 'SELECT * FROM employees WHERE employee_dni = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

  

const getEmployeesUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    name,
    phone,
    address,
    salary,
    agencyRif,
    jobId
  } = req.body

  const updateEmployee = [
    name,
    phone,
    address,
    salary,
    agencyRif,
    jobId
  ]
  return updateEmployee
}

export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updateEmployee = getEmployeesUpdateDataFromRequestBody(req)
    updateEmployee.push(req.params.employeeId)
    const response = await pool.query({
      text: 'UPDATE employees SET name = $1, phone = $2, address = $3, salary = $4, agency_rif = $5, job_id = $6  WHERE employee_dni = $7',
      values: updateEmployee
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.employeeId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }

    return res.status(STATUS.OK).json({ message: 'Empleado modificado exitosamente' })
  } catch (error: unknown) {
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
    return res.status(STATUS.OK).json({ message: 'Empleado Eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
