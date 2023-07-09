import { z } from 'zod'

export const activitiesSchema = z.object({
  description: z
    .string()
    .nonempty('Es necesario indicar una descripción de la actividad')
    .max(255, 'La descripción del servicio es muy larga'),
  costHour: z
    .number()
    .min(0, 'El costo por hora debe ser mayor o igual a cero')
})
