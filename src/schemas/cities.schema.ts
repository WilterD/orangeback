import { z } from 'zod'

export const citiesSchema = z.object({
  name: z
    .string()
    .nonempty('Es necesario indicar un nombre de estado')
    .max(32, 'El nombre debe ser menor a 32 carácteres'),
  stateId: z
    .number()
    .nonnegative('El id de estado no puede ser negativo')
})
