import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

export const getRecommendedServices = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log('get recomendatsion service', [req.params.licensePlate, req.params.mileage])
    const response = await pool.query({
      text: `
        SELECT
          s.service_id, 
          s.description, 
          SUM(a.cost_hour) AS total_cost,
          spm.mileage,
          spm.use_time
        FROM
          vehicles AS v,
          services_per_models AS spm,
          services AS s,
          activities AS a,
          employees_coordinate_services AS ecs,
          employees AS e
        WHERE 
          v.license_plate = $1 AND
          v.model_id = spm.model_id AND
          (spm.mileage BETWEEN $2-20 AND $2+20) AND
          spm.service_id = s.service_id AND
          s.service_id = a.service_id AND
          ecs.service_id = s.service_id AND
          ecs.employee_dni = e.employee_dni AND
          e.agency_rif = $3
        GROUP BY
          s.service_id, s.description, spm.mileage, spm.use_time
      `,
      values: [req.params.licensePlate, req.params.mileage, req.params.agencyRif]
    })
    console.log('respuesta :3', response.rows)
    if (response.rowCount === 0) {
      return res.status(STATUS.OK).json([])
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows))
  } catch (error: unknown) {
    console.log('error', error)
    return handleControllerError(error, res)
  }
}
