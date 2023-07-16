import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getBillingActivityUpdateDataFromRequestBody = (req: Request): any[] => {
  const { costHour, hoursTaken, employeeDni } = req.body

  const updatedBillingActivity = [costHour, hoursTaken, employeeDni]
  return updatedBillingActivity
}

export const updatedBillingActivity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedBillingActivity = getBillingActivityUpdateDataFromRequestBody(req)
    const response = await pool.query({
      text: `
        UPDATE order_details SET 
          cost_hour = $1, 
          hours_taken = $2, 
          employee_dni = $3 
        WHERE 
          service_id = $4 AND 
          activity_id = $5 AND 
          order_id = $6
      `,
      values: [
        ...updatedBillingActivity,
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
