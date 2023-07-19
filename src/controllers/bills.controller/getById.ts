import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'
import camelizeObject from '../../utils/camelizeObject'

export const getBillById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const responseBill = await pool.query({
      text: `
        SELECT
          bill_id,
          bill_date,
          discount_value,
          total_cost,
          order_id,
          ((1 - (discount_value/100)) * total_cost) AS total_cost_final
        FROM bills 
        WHERE bill_id = $1`,
      values: [req.params.billId]
    })
    if (responseBill.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de: ${req.params.billId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }

    const { rows: responseActivityItems } = await pool.query({
      text: `
        SELECT
          a.description,
          od.cost_hour AS price,
          od.hours_taken AS quantity
        FROM
          bills AS b,
          order_details AS od,
          activities AS a
        WHERE
          b.bill_id = $1 AND
          b.order_id = od.order_id AND
          od.service_id = a.service_id AND
          od.activity_id = a.activity_id
      `,
      values: [req.params.billId]
    })

    const { rows: responseProductItems } = await pool.query({
      text: `
        SELECT
          p.short_name_product AS description,
          piod.price,
          piod.quantity
        FROM
          bills AS b,
          products_in_order_details AS piod,
          products AS p
        WHERE
          b.bill_id = $1 AND
          b.order_id = piod.order_id AND
          piod.product_id = p.product_id
      `,
      values: [req.params.billId]
    })

    const items = [...responseActivityItems, ...responseProductItems]

    return res.status(STATUS.OK).json({
      ...camelizeObject(responseBill.rows[0]),
      items
    })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
