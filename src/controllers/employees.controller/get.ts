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

    const isEmpty = await pool.query({
      text: `
              SELECT 
                *
              FROM 
                employees
              ${onlyForAgencyRifCountComplement}
            `,
      values: countValues
    })
    if (isEmpty.rowCount === 0) {
      return res.status(STATUS.OK).json([])
    }
    const response = await pool.query({
      text: `SELECT 
              * 
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
      total: response.rowCount,
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
