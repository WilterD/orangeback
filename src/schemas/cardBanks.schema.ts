import { z } from 'zod'

export const createCardBanksSchema = z.object({
    cardNumber: z
    .string()
    .nonempty('Es necesario indicar un rif')
    .max(32, 'La tarjeta debe ser menor a 32  carácteres'),
  bank: z
    .string()
    .nonempty('Es necesario indicar un nombre de agencia')
    .max(32, 'El nombre debe ser menor a 32 carácteres')
})

export const updateCardBanksSchema = z.object({
    bank: z
    .string()
    .nonempty('Es necesario indicar un rif')
    .max(32, 'La tarjeta debe ser menor a 32  carácteres')
})
