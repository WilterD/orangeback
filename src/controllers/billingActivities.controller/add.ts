import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

const getBillingActivityCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    serviceId,
    activityId,
    orderId,
    employeeDni
  } = req.body
  const newBillingActivity = [
    serviceId,
    activityId,
    orderId,
    employeeDni
  ]
  return newBillingActivity
}

export const addBillingActivity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newBillingActivity = getBillingActivityCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: `
        INSERT INTO order_details (
          service_id, activity_id, order_id, employee_dni
        ) VALUES ($1, $2, $3, $4) 
        RETURNING service_id, activity_id, order_id
      `,
      values: newBillingActivity
    })
    const insertedServiceId: string = insertar.rows[0].serviceId
    const insertedActivityId: string = insertar.rows[0].activityId
    const insertedOrderId: string = insertar.rows[0].orderId
    const response = await pool.query({
      text: `
        SELECT * 
        FROM order_detail 
        WHERE 
          service_id = $1 AND 
          activity_id = $2 AND 
          order_id = $3
      `,
      values: [insertedServiceId, insertedActivityId, insertedOrderId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
