import { z } from 'zod'
import { createActivitiesSchema, updateActivitiesSchema } from './activities.schema'

export const createServicesSchema = z.object({
  description: z
    .string()
    .nonempty('Es necesario indicar una descripción del servicio')
    .max(255, 'La descripción del servicio es muy larga'),
  activities: z.array(createActivitiesSchema).min(1, 'Debe haber al menos una actividad')
})

export const updateServicesSchema = z.object({
  description: z
    .string()
    .nonempty('Es necesario indicar una descripción del servicio')
    .max(255, 'La descripción del servicio es muy larga'),
  activities: z.array(updateActivitiesSchema).min(1, 'Debe haber al menos una actividad')
})
