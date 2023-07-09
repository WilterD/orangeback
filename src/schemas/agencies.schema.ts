import { z } from 'zod'

export const createAgenciesSchema = z.object({
  agencyRif: z
    .string()
    .nonempty('Es necesario indicar un rif')
    .max(32, 'El Rif debe ser menor a 32  carácteres'),
  businessName: z
    .string()
    .nonempty('Es necesario indicar un nombre de agencia')
    .max(64, 'El nombre debe ser menor a 64 carácteres'),
  managerDni: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'la cédula debe ser menor a 16 carácteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números'),
  cityId: z
    .number()
    .min(1, 'El id de ciudad debe ser mayor o igual a 1')
})

export const updateAgenciesSchema = z.object({
  businessName: z
    .string()
    .nonempty('Es necesario indicar un nombre de agencia')
    .max(64, 'El nombre debe ser menor a 64 carácteres'),
  managerDni: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'la cédula debe ser menor a 16 carácteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números'),
  cityId: z
    .number()
})
