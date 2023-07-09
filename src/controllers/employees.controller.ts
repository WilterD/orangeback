import { Request, Response } from 'express'
import { pool } from '../database'
import { DEFAULT_PAGE, STATUS } from '../utils/constants'
import { PaginateSettings, paginatedItemsResponse } from '../utils/responses'
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
    return paginatedItemsResponse(
      res,
      STATUS.OK,
      camelizeObject(response.rows) as any,
      pagination
    )
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
      values: [req.params.employeeDni]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.employeeDni}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    const responseEmployee = await pool.query({
      text: 'SELECT * FROM employees WHERE employee_dni = $1',
      values: [req.params.employeeDni]
    })
    const responseServices = await pool.query({
      text: 'SELECT s.service_id, s.description FROM services AS s, employees_specialties AS es WHERE es.employee_dni = $1 AND es.service_id = s.service_id',
      values: [req.params.employeeDni]
    })
    return res
      .status(STATUS.OK)
      .json({
        ...camelizeObject(responseEmployee.rows[0]),
        services: camelizeObject(responseServices.rows)
      })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

interface EmployeeData {
  employeeDni: string
  name: string
  phone: string
  address: string
  salary: number
  agencyRif: string
  jobId: number
  servicesIds: number[]
}

const getEmployeesDataFromRequestBody = (req: Request): [any[], number[]] => {
  const {
    employeeDni,
    name,
    phone,
    address,
    salary,
    agencyRif,
    jobId,
    servicesIds
  } = req.body as EmployeeData

  const newEmployee = [
    employeeDni,
    name,
    phone,
    address,
    salary,
    agencyRif,
    jobId
  ]
  const employeeServices = servicesIds
  return [newEmployee, employeeServices]
}

export const addEmployee = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newEmployee = getEmployeesDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO employees (employee_dni, name, phone, address, salary, agency_rif, job_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING employee_dni',
      values: newEmployee[0]
    })
    const insertedEmployeeDni = insertar.rows[0].employee_dni
    for (let i = 0; i < newEmployee[1].length; i++) {
      await pool.query({
        text: 'INSERT INTO employees_specialties (service_id, employee_dni) VALUES ($1, $2)',
        values: [newEmployee[1][i], insertedEmployeeDni]
      })
    }

    const responseEmployee = await pool.query({
      text: 'SELECT * FROM employees WHERE employee_dni = $1',
      values: [insertedEmployeeDni]
    })
    const responseServices = await pool.query({
      text: 'SELECT s.service_id, s.description FROM services AS s, employees_specialties AS es WHERE es.employee_dni = $1 AND es.service_id = s.service_id',
      values: [insertedEmployeeDni]
    })
    return res
      .status(STATUS.CREATED)
      .json({
        ...camelizeObject(responseEmployee.rows[0]),
        services: camelizeObject(responseServices.rows)
      })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getEmployeesUpdateDataFromRequestBody = (req: Request): [any[], number[]] => {
  const {
    name,
    phone,
    address,
    salary,
    agencyRif,
    jobId,
    servicesIds
  } = req.body

  const updateEmployee = [
    name,
    phone,
    address,
    salary,
    agencyRif,
    jobId
  ]
  return [updateEmployee, servicesIds]
}

export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updateEmployee = getEmployeesUpdateDataFromRequestBody(req)
    updateEmployee[0].push(req.params.employeeDni)
    const response = await pool.query({
      text: 'UPDATE employees SET name = $1, phone = $2, address = $3, salary = $4, agency_rif = $5, job_id = $6  WHERE employee_dni = $7',
      values: updateEmployee[0]
    })
    for (let i = 0; i < updateEmployee[1].length; i++) {
      const { rows } = await pool.query({
        text: 'SELECT COUNT(*) FROM employees_specialties WHERE service_id = $1 AND employee_dni = $2',
        values: [updateEmployee[1][i], req.params.employeeDni]
      })
      if (Number(rows[0].count) === 0) {
        await pool.query({
          text: 'INSERT INTO employees_specialties (service_id, employee_dni) VALUES ($1, $2)',
          values: [updateEmployee[1][i], req.params.employeeDni]
        })
      }
    }
    const { rows } = await pool.query({
      text: 'SELECT service_id FROM employees_specialties WHERE employee_dni = $1',
      values: [req.params.employeeDni]
    })
    const actualServices = rows.map((servicio) => servicio.service_id)
    const deleteServices: number[] = []
    actualServices.forEach((elemento) => {
      if (!updateEmployee[1].includes(elemento)) {
        deleteServices.push(elemento)
      }
    })
    if (deleteServices.length !== 0) {
      for (let i = 0; i < deleteServices.length; i++) {
        await pool.query({
          text: 'DELETE FROM employees_specialties WHERE employee_dni = $1 AND service_id = $2',
          values: [req.params.employeeDni, deleteServices[i]]
        })
      }
    }
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.employeeDni}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res
      .status(STATUS.OK)
      .json({ message: 'Empleado modificado exitosamente' })
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
      values: [req.params.employeeDni]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.employeeDni}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res
      .status(STATUS.OK)
      .json({ message: 'Empleado Eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
