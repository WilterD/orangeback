import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

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






