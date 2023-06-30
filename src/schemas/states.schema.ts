import { z } from 'zod'

export const statesSchema = z.object({
  name: z
    .string()
    .nonempty('Es necesario indicar un nombre de estado')
    .max(32, 'El nombre debe ser menor a 32 carácteres')
})

// Maybe
// export type State = z.infer<typeof statesSchema>
