import { Request, Response } from 'express'
import { pool } from '../../database'
import { DEFAULT_PAGE, STATUS } from '../../utils/constants'
import {
  PaginateSettings,
  paginatedItemsResponse
} from '../../utils/responses'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

export const getEmployees = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query

  try {
    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    let onlyForAgencyRifCountComplement = ''
    let onlyForAgencyRifComplement = ''
    const countValues = []
    const values = [size, offset]
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const onlyForAgencyRif = (!!req.query?.onlyForAgencyRif && req.query?.onlyForAgencyRif !== null && req.query?.onlyForAgencyRif !== 'null' && req.query?.onlyForAgencyRif !== '') ? req.query?.onlyForAgencyRif : null

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (onlyForAgencyRif) {
      countValues.push(onlyForAgencyRif)
      values.push(onlyForAgencyRif)
      onlyForAgencyRifCountComplement = 'WHERE agency_rif = $1'
      onlyForAgencyRifComplement = 'WHERE agency_rif = $3'
    }

    const { rows } = await pool.query({
      text: `
              SELECT 
                count(*)
              FROM 
                employees
              ${onlyForAgencyRifCountComplement}
            `,
      values: countValues
    })

    const response = await pool.query({
      text: `SELECT 
              *, TO_CHAR(created_at, 'YYYY-MM-DD HH:MI:SS') as created_at 
            FROM 
              employees
            ${onlyForAgencyRifComplement}
            ORDER BY 
              name 
            LIMIT 
              $1 OFFSET $2`,
      values
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
