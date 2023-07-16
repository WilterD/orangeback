import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

export const deleteBillingActivity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: `
        DELETE FROM order_details 
        WHERE 
          service_id = $1 AND 
          activity_id = $2 AND 
          order_id = $3
      `,
      values: [req.params.serviceId, req.params.activityId, req.params.orderId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar la orden de id: ${req.params.orderId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Item de Orden Eliminado Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
