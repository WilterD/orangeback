import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { ServicePaginated } from './types'

const getAllServices = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const items = await executeGetAllServices(req)
    return res.status(STATUS.OK).json(items)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

async function executeGetAllServices (
  req: Request
): Promise<ServicePaginated[]> {
  let text = `
    SELECT
      s.service_id,
      s.description,
      SUM(a.cost_hour) AS total_cost,
      s.created_at
    FROM services AS s, activities AS a
    WHERE s.service_id = a.service_id
    GROUP BY
      s.service_id,
      s.description,
      s.created_at
    ORDER BY description`

  let response

  if (
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    req.query?.onlyForAgencyRif &&
    req.query?.onlyForAgencyRif !== null &&
    req.query?.onlyForAgencyRif !== 'null' &&
    req.query?.onlyForAgencyRif !== ''
  ) {
    let discriminantServicesConditional = 'e.agency_rif = $1 AND'
    const whereArgs = [req.query.onlyForAgencyRif]
    if (
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      !!req.query?.includeServicesIds &&
      req.query?.includeServicesIds !== null &&
      req.query?.includeServicesIds !== 'null' &&
      req.query?.includeServicesIds !== ''
    ) {
      discriminantServicesConditional = '(e.agency_rif = $1 OR s.service_id IN ($2)) AND'
      whereArgs.push(req.query?.includeServicesIds)
    }

    text = `
      SELECT
        s.service_id,
        s.description,
        SUM(a.cost_hour) AS total_cost,
        s.created_at
      FROM
        employees as e,
        employees_coordinate_services AS ecs,
        services AS s,
        activities AS a
      WHERE
        ${discriminantServicesConditional}
        e.employee_dni = ecs.employee_dni AND
        ecs.service_id = s.service_id AND
        s.service_id = a.service_id 
      GROUP BY
        s.service_id,
        s.description,
        s.created_at
      ORDER BY description
    `

    response = await pool.query({ text, values: [req.query.onlyForAgencyRif] })
  } else {
    response = await pool.query({ text })
  }

  return camelizeObject(response.rows) as unknown as ServicePaginated[]
}

export default getAllServices
