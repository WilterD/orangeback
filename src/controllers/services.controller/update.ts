import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { ServiceData } from './interface'
import { StatusError } from '../../utils/responses/status-error'

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
    updatedService[0].push(req.params.serviceId)
    const responseService = await pool.query({
      text: 'UPDATE services SET description = $1 WHERE service_id = $2',
      values: updatedService[0]
    })
    if (responseService.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.serviceId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    for (let i = 0; i < updatedService[1].length; i++) {
      updatedService[1][i].push(req.params.serviceId)
      await pool.query({
        text: 'UPDATE activities SET description = $1, cost_hour = $2 WHERE activity_id = $3 AND service_id = $4',
        values: updatedService[1][i]
      })
    }
    return res
      .status(STATUS.OK)
      .json({ message: 'Servicio modificado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
