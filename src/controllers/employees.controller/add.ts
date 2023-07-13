import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

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
  return [newEmployee, servicesIds]
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






