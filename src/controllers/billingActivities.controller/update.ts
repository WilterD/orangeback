import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getBillingActivityUpdateDataFromRequestBody = (req: Request): any[] => {
  const { hoursTaken, employeeDni } = req.body

  const updatedBillActivity = [hoursTaken, employeeDni]
  return updatedBillActivity
}

export const updatedBillingActivity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedBillActivity = getBillingActivityUpdateDataFromRequestBody(req)
    const response = await pool.query({
      text: `
        UPDATE order_details SET 
          hours_taken = $1, 
          employee_dni = $2 
        WHERE 
          service_id = $3 AND 
          activity_id = $4 AND 
          order_id = $5
      `,
      values: [
        ...updatedBillActivity,
        req.params.serviceId,
        req.params.activityId,
        req.params.orderId
      ]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar la orden de id: ${req.params.orderId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res
      .status(STATUS.OK)
      .json({ message: 'Item de Orden Modificado Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
