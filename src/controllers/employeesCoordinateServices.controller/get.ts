import { Request, Response } from 'express'
import { pool } from '../../database'
import { DEFAULT_PAGE, STATUS } from '../../utils/constants'
import {
  PaginateSettings,
  paginatedItemsResponse
} from '../../utils/responses'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

export const getEmployeesCoordinateServices = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query

  try {
    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const { rows } = await pool.query({
      text: `
        SELECT 
          COUNT(*) 
        FROM 
          employees_coordinate_services`
    })

    let text = `
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
        ecs.service_id = s.service_id
      ORDER BY 
        employee_dni, 
        service_id 
      LIMIT $1 OFFSET $2
    `

    let response

    if (req.query?.onlyForAgencyRif != null && req.query?.onlyForAgencyRif !== '') {
      text = `
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
          services as s,
          agencies as a
        WHERE
          ecs.service_id = s.service_id AND
          ecs.employee_dni = e.employee_dni AND
          e.agency_rif = a.agency_rif AND
          a.agency_rif = $3
        ORDER BY 
          employee_dni, 
          service_id 
        LIMIT $1 OFFSET $2
      `

      response = await pool.query({
        text,
        values: [size, offset, req.query.onlyForAgencyRif]
      })
    } else {
      response = await pool.query({
        text,
        values: [size, offset]
      })
    }

    const pagination: PaginateSettings = {
      total: Number(rows[0].count),
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
    console.log(error)
    return handleControllerError(error, res)
  }
}
