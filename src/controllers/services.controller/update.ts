import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { ServiceData } from './interface'
import { StatusError } from '../../utils/responses/status-error'
import getServiceById from './getServiceById.util'

const getServicesUpdateDataFromRequestBody = (
  req: Request
): [string[], Array<Array<string | number | undefined>>] => {
  const { description, activities } = req.body as ServiceData
  const updatedService = [description]
  const updatedActivities = activities.map((activity) => [
    activity.description,
    activity.costHour,
    activity.activityId
  ])
  return [updatedService, updatedActivities]
}

export const updateService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedService = getServicesUpdateDataFromRequestBody(req)
    const responseService = await pool.query({
      text: 'UPDATE services SET description = $1 WHERE service_id = $2',
      values: [...updatedService[0], req.params.serviceId]
    })
    if (responseService.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.serviceId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    for (let i = 0; i < updatedService[1].length; i++) {
      const { rows } = await pool.query({
        text: 'SELECT COUNT(*) FROM activities WHERE service_id = $1 AND activity_id = $2',
        values: [req.params.serviceId, updatedService[1][i][2]]
      })
      if (Number(rows[0].count) === 0) {
        await pool.query({
          text: 'INSERT INTO activities (service_id, description, cost_hour) VALUES ($1, $2, $3)',
          values: [req.params.serviceId, updatedService[1][i]]
        })
      }
    }
    for (let i = 0; i < updatedService[1].length; i++) {
      if (updatedService[1][i][2] !== null) {
        await pool.query({
          text: 'UPDATE activities SET description = $1, cost_hour = $2 WHERE activity_id = $3 AND service_id = $4',
          values: [...updatedService[1][i], req.params.serviceId]
        })
      }
    }
    const service = await getServiceById(+req.params.serviceId)
    return res.status(STATUS.OK).json(service)
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
