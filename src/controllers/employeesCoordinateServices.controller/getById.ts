import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { StatusError } from '../../utils/responses/status-error'

export const getEmployeeCoordinateServiceById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: `
      SELECT 
        ecs.employee_dni,
        e.name AS employee_name,
        ecs.service_id,
        s.description AS service_name,
        ecs.reservation_time,
        ecs.capacity,
        ecs.created_at
      FROM 
        employees_coordinate_services as ecs,
        employees as e,
        services as s
      WHERE
        ecs.employee_dni = e.employee_dni AND
        ecs.service_id = s.service_id AND
        e.employee_dni = $1 AND
        s.service_id = $2
      ORDER BY 
        employee_dni, 
        service_id 
    `,
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
