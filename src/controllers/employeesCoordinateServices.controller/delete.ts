import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'
import { handleControllerError } from '../../utils/responses/handleControllerError'

export const deleteEmployeeCoordinateService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: `DELETE FROM 
            employees_coordinate_services 
          WHERE 
            employee_dni = $1 
            AND service_id = $2`,
      values: [req.params.employeeDni, req.params.serviceId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: 'No se pudo encontrar el registro solicitado',
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res
      .status(STATUS.OK)
      .json({
        message:
          'Coordinación de servicio Eliminada Exitosamente correctamente'
      })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
