import { z } from 'zod'

export const servicesCreateSchema = z.object({
  description: z
    .string()
    .nonempty('Es necesario indicar una descripción del servicio')
    .max(255, 'La descripción del servicio es muy larga')
})

export const servicesUpdateSchema = z.object({
  description: z
    .string()
    .nonempty('Es necesario indicar una descripción del servicio')
    .max(255, 'La descripción del servicio es muy larga')
})
