import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { ServiceData } from './interface'

const getServicesCreateDataFromRequestBody = (
  req: Request
): [string[], string[][]] => {
  const { description, activities } = req.body as ServiceData
  const newService = [description]
  const newActivities = activities.map((activity) => [
    activity.description,
    activity.costHour
  ])
  return [newService, newActivities]
}

export const addService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newService = getServicesCreateDataFromRequestBody(req)

    const insertService = await pool.query({
      text: 'INSERT INTO services (description) VALUES ($1) RETURNING service_id',
      values: newService[0]
    })
    const insertedServiceId: string = insertService.rows[0].service_id
    for (let i = 0; i < newService[1].length; i++) {
      newService[1][i].push(insertedServiceId)
      await pool.query({
        text: 'INSERT INTO activities (description, cost_hour, service_id) VALUES ($1, $2, $3)',
        values: newService[1][i]
      })
    }
    const responseService = await pool.query({
      text: 'SELECT * FROM services WHERE service_id = $1',
      values: [insertedServiceId]
    })
    const responseActivities = await pool.query({
      text: 'SELECT * FROM activities WHERE service_id = $1',
      values: [insertedServiceId]
    })
    return res.status(STATUS.CREATED).json({
      ...camelizeObject(responseService.rows[0]),
      activities: camelizeObject(responseActivities.rows)
    })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
