import { Request, Response } from 'express'
import { pool } from '../../database'
import { DEFAULT_PAGE, STATUS } from '../../utils/constants'
import { PaginateSettings, paginatedItemsResponse } from '../../utils/responses'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

export const getServices = async (
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
      text: 'SELECT COUNT(*) FROM services'
    })

    let text = `
      SELECT 
        s.service_id, 
        s.description, 
        (
          SELECT SUM(cost_hour)
          FROM activities
          WHERE service_id = s.service_id
        ) AS total_cost,
        COUNT(bps.service_id) AS total_appearances, 
        TO_CHAR(s.created_at, 'YYYY-MM-DD HH:MI:SS') as created_at
      FROM 
        services AS s
      LEFT JOIN
        bookings_per_services bps
        ON s.service_id = bps.service_id
      GROUP BY 
        s.service_id, 
        s.description, 
        s.created_at 
      ORDER BY description LIMIT $1 OFFSET $2
    `

    if (
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      req.query?.orderByTotalAppearance &&
      req.query?.orderByTotalAppearance !== null &&
      req.query?.orderByTotalAppearance !== 'null' &&
      req.query?.orderByTotalAppearance !== '' &&
      (
        req.query?.orderByTotalAppearance === 'ASC' ||
        req.query?.orderByTotalAppearance === 'DESC'
      )
    ) {
      text = `
        SELECT 
          s.service_id, 
          s.description, 
          (
            SELECT SUM(cost_hour)
            FROM activities
            WHERE service_id = s.service_id
          ) AS total_cost,
          COUNT(bps.service_id) AS total_appearances, 
          s.created_at
        FROM 
          services AS s
        LEFT JOIN
          bookings_per_services bps ON s.service_id = bps.service_id
        GROUP BY 
          s.service_id, 
          s.description, 
          s.created_at 
        ORDER BY total_appearances ${req.query?.orderByTotalAppearance}
        LIMIT $1 OFFSET $2
      `
    }

    const response = await pool.query({
      text,
      values: [size, offset]
    })

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
    return handleControllerError(error, res)
  }
}
