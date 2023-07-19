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
    employeeDni,
    hoursTaken
  } = req.body
  const newBillingActivity = [
    serviceId,
    activityId,
    orderId,
    employeeDni,
    hoursTaken
  ]
  return newBillingActivity
}

export const addBillingActivity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newBillingActivity = getBillingActivityCreateDataFromRequestBody(req)

    const { rows: costHour } = await pool.query({
      text: `
        SELECT
          cost_hour
        FROM
          activities
        WHERE
          service_id = $1 AND
          activity_id = $2
      `,
      values: [req.body.serviceId, req.body.activityId]
    })
    await pool.query({
      text: `
        INSERT INTO order_details (
          service_id, 
          activity_id, 
          order_id, 
          employee_dni, 
          hours_taken,
          cost_hour
        ) VALUES ($1, $2, $3, $4, $5, $6)
      `,
      values: [...newBillingActivity, costHour[0].cost_hour]
    })

    const response = await pool.query({
      text: `
        SELECT * 
        FROM order_details
        WHERE 
          service_id = $1 AND 
          activity_id = $2 AND 
          order_id = $3
      `,
      values: [req.body.serviceId, req.body.activityId, req.body.orderId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
