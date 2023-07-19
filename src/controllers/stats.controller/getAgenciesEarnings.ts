import { Request, Response } from 'express'
import { pool } from '../../database'
import camelizeObject from '../../utils/camelizeObject'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { DEFAULT_PAGE, STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'
import { PaginateSettings, paginatedItemsResponse } from '../../utils/responses'

export const getAgenciesEarnsMost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: `
        SELECT 
          a.business_name AS agency_name, 
          SUM(od.cost_hour * od.hours_taken) AS total_earnings
        FROM agencies AS a
        JOIN employees AS e ON a.agency_rif = e.agency_rif
        JOIN orders AS o ON e.employee_dni = o.employee_dni
        JOIN order_details AS od ON o.order_id = od.order_id
        WHERE 
          o.real_departure BETWEEN $1 AND $2
        GROUP BY a.business_name
        ORDER BY total_earnings DESC
      `,
      values: [req.params.dateInit, req.params.dateEnd]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: 'No se pudo encontrar ningun servicio en ese periodo',
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const getAgenciesEarnings = async (
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
        FROM agencies AS a
        JOIN employees AS e ON a.agency_rif = e.agency_rif
        JOIN orders AS o ON e.employee_dni = o.employee_dni
        JOIN order_details AS od ON o.order_id = od.order_id
        WHERE 
          o.real_departure BETWEEN $1 AND $2
      `,
      values: [req.params.dateInit, req.params.dateEnd]
    })

    let text

    if (
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      req.query?.orderBy &&
      req.query?.orderBy !== null &&
      req.query?.orderBy !== 'null' &&
      req.query?.orderBy !== '' &&
      (
        req.query?.orderBy === 'ASC' ||
        req.query?.orderBy === 'DESC'
      )
    ) {
      text = `
        SELECT 
          a.business_name AS agency_name, 
          SUM(od.cost_hour * od.hours_taken) AS total_earnings
        FROM agencies AS a
        JOIN employees AS e ON a.agency_rif = e.agency_rif
        JOIN orders AS o ON e.employee_dni = o.employee_dni
        JOIN order_details AS od ON o.order_id = od.order_id
        WHERE 
          o.real_departure BETWEEN $1 AND $2
        GROUP BY a.business_name
        ORDER BY total_earnings ${req.query.orderBy}
        LIMIT $3 OFFSET $4
      `
    } else {
      throw new StatusError({
        message: 'Es necesario enviar un modo de ordenamiento en orderBy',
        statusCode: STATUS.BAD_REQUEST
      })
    }

    const response = await pool.query({
      text,
      values: [req.params.dateInit, req.params.dateEnd, size, offset]
    })

    const pagination: PaginateSettings = {
      total: Number(rows[0].count),
      page: Number(page),
      perPage: Number(size)
    }
    return paginatedItemsResponse(res, STATUS.OK, camelizeObject(response.rows) as any, pagination)
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
