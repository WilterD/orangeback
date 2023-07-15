import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { ServiceData } from './interface'
import getServiceById from './getServiceById.util'

function getServicesCreateDataFromRequestBody (
  req: Request
): [ServiceCreatePayload, ActivityCreatePayload[]] {
  const { description, activities } = req.body as ServiceData
  const newService = [description] as [string]
  const newActivities = activities.map((activity) => [
    '' + activity.description,
    +activity.costHour
  ] as [string, number])
  return [newService, newActivities]
}

export const addService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const [dataCreateService, newActivities] = getServicesCreateDataFromRequestBody(req)

    const insertedServiceId = await createNewService(dataCreateService)

    for (let i = 0; i < newActivities.length; i++) {
      await createActivityForService(newActivities[i], insertedServiceId)
    }

    const service = await getServiceById(+insertedServiceId)
    return res.status(STATUS.CREATED).json(service)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

async function createNewService (payload: ServiceCreatePayload): Promise<string> {
  const insertService = await pool.query({
    text: 'INSERT INTO services (description) VALUES ($1) RETURNING service_id',
    values: payload
  })
  return insertService.rows[0].service_id as string
}

async function createActivityForService (payload: ActivityCreatePayload, insertedServiceId: string): Promise<void> {
  await pool.query({
    text: 'INSERT INTO activities (description, cost_hour, service_id) VALUES ($1, $2, $3)',
    values: [...payload, insertedServiceId]
  })
}

type ServiceCreatePayload = [string]
type ActivityCreatePayload = [string, number]
