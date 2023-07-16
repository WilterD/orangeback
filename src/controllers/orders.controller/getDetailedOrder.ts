import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'
import { Order } from './types'
import camelizeObject from '../../utils/camelizeObject'

export const getDetailedOrder = async (orderId: string): Promise<Order> => {
  const response = await pool.query({
    text: 'SELECT * FROM orders WHERE order_id = $1',
    values: [orderId]
  })

  if (response.rowCount === 0) {
    throw new StatusError({
      message: `No se pudo encontrar el registro de id: ${orderId}`,
      statusCode: STATUS.NOT_FOUND
    })
  }

  return camelizeObject(response.rows[0]) as unknown as Order
}

export default getDetailedOrder
