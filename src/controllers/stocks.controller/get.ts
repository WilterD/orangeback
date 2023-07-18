import { Request, Response } from 'express'
import { pool } from '../../database'
import { DEFAULT_PAGE, STATUS } from '../../utils/constants'
import { PaginateSettings, paginatedItemsResponse } from '../../utils/responses'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

export const getProductsPerAgencies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query

  try {
    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    let registros

    let text = `
      SELECT
        p.product_id,
        p.short_name_product,
        ppa.agency_rif,
        ppa.on_stock,
        ppa.min_capacity,
        ppa.max_capacity,
        ppa.created_at
      FROM 
        products_per_agencies AS ppa,
        products AS p
      WHERE
        ppa.product_id = p.product_id
      ORDER BY product_id 
      LIMIT $1 OFFSET $2
    `

    let response

    if (
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      req.query?.onlyForAgencyRif &&
      req.query?.onlyForAgencyRif !== null &&
      req.query?.onlyForAgencyRif !== 'null' &&
      req.query?.onlyForAgencyRif !== ''
    ) {
      const { rows } = await pool.query({
        text: `
          SELECT 
            COUNT(*) 
          FROM 
            products_per_agencies
          WHERE
            agency_rif = $1
        `,
        values: [req.query.onlyForAgencyRif]
      })

      registros = rows[0].count

      text = `
        SELECT 
          p.product_id,
          p.short_name_product,
          ppa.agency_rif,
          ppa.on_stock,
          ppa.min_capacity,
          ppa.max_capacity,
          ppa.created_at
        FROM 
          products_per_agencies AS ppa,
          products AS p
        WHERE
          ppa.product_id = p.product_id AND
          ppa.agency_rif = $3
        ORDER BY product_id 
        LIMIT $1 OFFSET $2
      `

      response = await pool.query({
        text,
        values: [size, offset, req.query.onlyForAgencyRif]
      })
    } else {
      const { rows } = await pool.query({
        text: `
          SELECT 
            COUNT(*) 
          FROM products_per_agencies
        `
      })

      registros = rows[0].count

      response = await pool.query({
        text,
        values: [size, offset]
      })
    }

    const pagination: PaginateSettings = {
      total: Number(registros),
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
