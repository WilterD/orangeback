import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

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
    const updatedEmployee = getEmployeesUpdateDataFromRequestBody(req)
    updatedEmployee[0].push(req.params.employeeDni)
    const response = await pool.query({
      text: 'UPDATE employees SET name = $1, phone = $2, address = $3, salary = $4, agency_rif = $5, job_id = $6  WHERE employee_dni = $7',
      values: updatedEmployee[0]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.employeeDni}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    for (let i = 0; i < updatedEmployee[1].length; i++) {
      const { rows } = await pool.query({
        text: 'SELECT COUNT(*) FROM employees_specialties WHERE service_id = $1 AND employee_dni = $2',
        values: [updatedEmployee[1][i], req.params.employeeDni]
      })
      if (Number(rows[0].count) === 0) {
        await pool.query({
          text: 'INSERT INTO employees_specialties (service_id, employee_dni) VALUES ($1, $2)',
          values: [updatedEmployee[1][i], req.params.employeeDni]
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
      if (!updatedEmployee[1].includes(elemento)) {
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
    return res
      .status(STATUS.OK)
      .json({ message: 'Empleado modificado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
