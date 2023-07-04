import { z } from 'zod'

export const discountsSchema = z.object({
  percentage: z
    .number(),
  servicesMin: z
    .number(),
  servicesMax: z
    .number(),
  agencyRif: z
    .string()
    .nonempty('Es necesario indicar un rif')
    .max(16, 'El rif debe ser menor a 16  carácteres')
    .regex(/^\d+$/, 'El rif debe contener solo números')
})
