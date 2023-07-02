import { z } from 'zod'

export const jobsSchema = z.object({
  description: z
    .string()
    .nonempty('Es necesario indicar una descripcion de trabajo')
    .max(64, 'la descripción debe ser menor a 64 carácteres')
})
