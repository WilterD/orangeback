import { Request, Response } from 'express'
import { pool } from '../../database'
import { DEFAULT_PAGE, STATUS } from '../../utils/constants'
import { PaginateSettings, paginatedItemsResponse } from '../../utils/responses'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

export const getAgencies = async (
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
      text: 'SELECT COUNT(*) FROM agencies'
    })

    const response = await pool.query({
      text: `
              SELECT
                a.agency_rif,
                a.business_name,
                a.manager_dni,
                a.city_id,
                a.created_at,
                to_char(a.created_at, 'DD/MM/YYYY') AS created_at_formatted,
                c.name as city_name,
                s.name as state_name,
                m.name as manager_name
              FROM
                agencies a, cities c, states s, managers m
              WHERE
                a.city_id = c.city_id AND
                c.state_id = s.state_id AND
                a.manager_dni = m.manager_dni
              ORDER BY business_name
              LIMIT $1 OFFSET $2
            `,
      values: [size, offset]
    })
    const pagination: PaginateSettings = {
      total: Number(rows[0].count),
      page: Number(page),
      perPage: Number(size)
    }
    return paginatedItemsResponse(res, STATUS.OK, camelizeObject(response.rows) as any, pagination)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
