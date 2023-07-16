import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getEmployeeCoordinateServiceUpdateDataFromRequestBody = (
  req: Request
): any[] => {
  const { reservationTime, capacity } = req.body

  const updatedEmployeeCoordinatesService = [reservationTime, capacity]
  return updatedEmployeeCoordinatesService
}

export const updateEmployeeCoordinateService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedEmployeeCoordinatesService =
      getEmployeeCoordinateServiceUpdateDataFromRequestBody(req)
    updatedEmployeeCoordinatesService.push(req.params.employeeDni)
    updatedEmployeeCoordinatesService.push(req.params.serviceId)
    const response = await pool.query({
      text: `UPDATE 
                employees_coordinate_services 
              SET 
                reservation_time = $1, 
                capacity = $2 
              WHERE 
                employee_dni = $3 
                AND service_id = $4`,
      values: updatedEmployeeCoordinatesService
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: 'No se pudo encontrar el registro',
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res
      .status(STATUS.OK)
      .json({
        message:
          'Servicio de coordinación de empleados modificado exitosamente'
      })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
