import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import camelizeObject from '../../utils/camelizeObject'
import { StatusError } from '../../utils/responses/status-error'
import { Bill, Payment } from './types'

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

  bill.payments = await getPaymentsByBillId(bill.billId)

  return bill
}

export async function getPaymentsByBillId (billId: number): Promise<Payment[]> {
  const response = await pool.query({
    text: 'SELECT * FROM payments WHERE bill_id = $1',
    values: [billId]
  })

  return response.rows.map(row => {
    const payment: Payment = {
      billId: row.bill_id,
      paymentId: row.payment_id,
      cost: row.cost,
      paymentDate: row.payment_date,
      paymentMethod: row.payment_method,
      cardNumber: row.card_number,
      createdAt: row.created_at
    }

    return payment
  })
}