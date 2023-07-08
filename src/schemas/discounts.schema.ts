import { z } from 'zod'

export const discountsSchema = z.object({
  percentage: z
    .number()
    .min(1, 'El porcentaje debe ser mayor o igual a 1'),
  servicesMin: z
    .number()
    .min(1, 'El mínimo de servicios debe ser mayor o igual a 1'),
  servicesMax: z
    .number()
    .min(1, 'El máximo de servicios debe ser mayor o igual a 1'),
  agencyRif: z
    .string()
    .nonempty('Es necesario indicar un rif')
    .max(16, 'El rif debe ser menor a 16  carácteres')
    .regex(/^\d+$/, 'El rif debe contener solo números')
})
