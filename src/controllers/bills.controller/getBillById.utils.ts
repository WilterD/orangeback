import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import camelizeObject from '../../utils/camelizeObject'
import { StatusError } from '../../utils/responses/status-error'
import { Bill } from './types'

export default async function getBillById (billId: number): Promise<Bill> {
  const response = await pool.query({
    text: 'SELECT * FROM bills WHERE bill_id = $1',
    values: [billId]
  })

  if (response.rowCount === 0) {
    throw new StatusError({
      message: `No se pudo encontrar el registro de: ${billId}`,
      statusCode: STATUS.NOT_FOUND
    })
  }

  const bill = camelizeObject(response.rows[0]) as unknown as Bill
  return bill
}
