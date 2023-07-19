import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'
import { Order } from './types'
import camelizeObject from '../../utils/camelizeObject'

export const getDetailedOrder = async (orderId: string): Promise<Order> => {
  const responseOrder = await pool.query({
    text: `
      SELECT * 
      FROM orders 
      WHERE order_id = $1
    `,
    values: [orderId]
  })

  if (responseOrder.rowCount === 0) {
    throw new StatusError({
      message: `No se pudo encontrar el registro de id: ${orderId}`,
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
        order_details AS od,
        activities AS a
      WHERE
        od.order_id = $1 AND
        od.service_id = a.service_id AND
        od.activity_id = a.activity_id
    `,
    values: [orderId]
  })

  const { rows: responseProductItems } = await pool.query({
    text: `
      SELECT
        p.short_name_product AS description,
        piod.price,
        piod.quantity
      FROM
        products_in_order_details AS piod,
        products AS p
      WHERE
        piod.order_id = $1 AND
        piod.product_id = p.product_id
    `,
    values: [orderId]
  })

  const items = [...responseActivityItems, ...responseProductItems]

  return { ...camelizeObject(responseOrder.rows[0]), items } as unknown as Order
}

export default getDetailedOrder
