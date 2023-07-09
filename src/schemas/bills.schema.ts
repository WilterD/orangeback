import { z } from 'zod'

export const createBillsSchema = z.object({
    bill_date: z
    .string()
    .nonempty('Es necesario indicar un rif')
    .max(32, 'El Rif debe ser menor a 32  carácteres')
    .regex(/^\d+$/, 'El Rif debe contener solo números'),
    discount_value: z
    .string()
    .nonempty('Es necesario indicar un nombre de agencia')
    .max(64, 'El nombre debe ser menor a 64 carácteres'),
    total_cost: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'la cédula debe ser menor a 16 carácteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números'),
    order_id: z
    .number()
    .min(1, 'El id de ciudad debe ser mayor o igual a 1')
})

export const updateBillsSchema = z.object({
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
