import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { StatusError } from '../../utils/responses/status-error'

export const getAgencyById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
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
              a.manager_dni = m.manager_dni AND
              agency_rif = $1
            `,
      values: [req.params.agencyId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de: ${req.params.agencyId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
