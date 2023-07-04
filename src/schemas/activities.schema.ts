import { z } from 'zod'

export const activitiesUpdateSchema = z.object({
  description: z
    .string()
    .nonempty('Es necesario indicar una descripción del servicio')
    .max(255, 'La descripción del servicio es muy larga'),
  costHour: z
    .number()
})
