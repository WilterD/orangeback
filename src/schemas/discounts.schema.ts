import { z } from 'zod'

export const discountsSchema = z.object({
    percentage: z
    .number(),
    services_min: z
    .number(),
    services_max: z
    .number(),
    agency_rif: z
    .string()
    .nonempty("Es necesario indicar un rif")
    .max(16, "El rif debe ser menor a 16  carácteres")
    .regex(/^\d+$/, "El rif debe contener solo números"),
})

