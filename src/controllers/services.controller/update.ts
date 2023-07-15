import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { ServiceData } from './interface'
import { StatusError } from '../../utils/responses/status-error'
import getServiceById from './getServiceById.util'
import camelizeObject from '../../utils/camelizeObject'

export const updateService = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const serviceId = +req.params.serviceId
    const [payloadService, payloadActivities] = getServicesUpdateDataFromRequestBody(req)
    await updateServiceById(payloadService, serviceId)

    // Elimina la actividad si encuentra un id de los actividades antiguas que no este en las nuevas actividades
    await deleteActivitiesByServiceId(serviceId, payloadActivities)

    // Creacion de NUEVAS actividades
    for (let i = 0; i < payloadActivities.length; i++) {
      const activityPayload = payloadActivities[i]
      const activityId = activityPayload[2] ?? null

      if (activityId == null) {
        // Si es nulo, crea la actividad
        await insertActivity(serviceId, activityPayload)
      } else {
        // Si no es nulo, actualiza la actividad
        if (await activityExistsByTuple(serviceId, activityId)) {
          await updateActivity(activityPayload, serviceId)
        }
      }
    }

    const service = await getServiceById(+req.params.serviceId)
    return res.status(STATUS.OK).json(service)
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

const getServicesUpdateDataFromRequestBody = (
  req: Request
): [ServiceUpdatePayload, ActivityUpdatePayload[]] => {
  const { description, activities } = req.body as ServiceData
  const updatedService = [description] as ServiceUpdatePayload
  const updatedActivities = activities.map((activity) => (
    [
      '' + activity.description,
      +activity.costHour,
      activity.activityId ?? null
    ] as ActivityUpdatePayload
  ))
  return [updatedService, updatedActivities]
}

async function updateServiceById (payload: ServiceUpdatePayload, serviceId: number): Promise<void> {
  const responseService = await pool.query({
    text: 'UPDATE services SET description = $1 WHERE service_id = $2',
    values: [...payload, serviceId]
  })

  if (responseService.rowCount === 0) {
    throw new StatusError({
      message: `No se pudo encontrar el registro de id: ${serviceId}`,
      statusCode: STATUS.NOT_FOUND
    })
  }
}

async function deleteActivityById (activityId: number): Promise<void> {
  const responseActivity = await pool.query({
    text: 'DELETE FROM activities WHERE activity_id = $1',
    values: [activityId]
  })

  if (responseActivity.rowCount === 0) {
    throw new StatusError({
      message: `No se pudo encontrar el registro de id: ${activityId}`,
      statusCode: STATUS.NOT_FOUND
    })
  }
}

async function activityExistsByTuple (serviceId: number, activityId: number): Promise<boolean> {
  const { rows } = await pool.query({
    text: 'SELECT COUNT(*) FROM activities WHERE service_id = $1 AND activity_id = $2',
    values: [serviceId, activityId]
  })
  return (Number(rows[0].count) >= 1)
}

async function insertActivity (serviceId: number, activityPayload: ActivityUpdatePayload): Promise<void> {
  await pool.query({
    text: 'INSERT INTO activities (service_id, description, cost_hour) VALUES ($1, $2, $3)',
    values: [serviceId, activityPayload[0], activityPayload[1]]
  })
}

async function updateActivity (
  activityPayload: ActivityUpdatePayload,
  serviceId: number
): Promise<void> {
  await pool.query({
    text: `
              UPDATE activities
                SET description = $1, cost_hour = $2
              WHERE
                activity_id = $3 AND service_id = $4
            `,
    values: [...activityPayload, serviceId]
  })
}

async function getActivitiesByService (serviceId: number): Promise<Activity[]> {
  const responseActivities = await pool.query({
    text: 'SELECT * FROM activities WHERE service_id = $1',
    values: [serviceId]
  })
  return camelizeObject(responseActivities.rows) as Activity[]
}

async function deleteActivitiesByServiceId (
  serviceId: number,
  payloadActivities: ActivityUpdatePayload[]
): Promise<void> {
  const activites = await getActivitiesByService(serviceId)
  const oldActivitiesIds = activites.map((activity) => activity.activityId)
  const newActivitiesIds = payloadActivities.map((activity) => activity[2])

  // Encuentra las actividades para eliminar
  const activitiesToDelete = oldActivitiesIds.filter((activity) =>
    !newActivitiesIds.includes(activity)
  )

  // Eliminamos :3
  for (let i = 0; i < activitiesToDelete.length; i++) await deleteActivityById(activitiesToDelete[i])
}

type ServiceUpdatePayload = [string]
type ActivityUpdatePayload = [string, number, number | null]

interface Activity {
  activityId: number
  description: string
  costHour: string
}
