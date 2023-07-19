import { Request, Response } from 'express'
import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { STATUS } from '../../utils/constants'

export const getAllEmployeesByAgencyAndService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { rows } = await pool.query({
      text: `
        SELECT
          e.name AS employee_name
        FROM
          employees AS e,
          employees_coordinate_services AS ecs
        WHERE
          e.agency_rif = $1 AND
          e.employee_dni = ecs.employee_dni AND
          ecs.service_id = $2
        ORDER BY e.name
      `,
      values: [req.body.agencyRif, req.body.serviceId]
    })
    return res.status(STATUS.OK).json(camelizeObject(rows))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
