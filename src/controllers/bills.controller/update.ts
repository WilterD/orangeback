import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getBillsUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    billDate,
    discountValue,
    totalCost,
    orderId
  } = req.body

  const updatedBill = [
    billDate,
    discountValue,
    totalCost,
    orderId
  ]
  return updatedBill
}

export const updateBill = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedBill = getBillsUpdateDataFromRequestBody(req)
    updatedBill.push(req.params.billId)
    const response = await pool.query({
      text: `UPDATE bills 
            SET bill_date = $1, 
            discount_value = $2, 
            total_cost = $3, 
            order_id = $4 
            WHERE bill_id = $5`,
      values: updatedBill
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.billId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Agencia Modificada Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
