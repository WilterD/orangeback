import { z } from 'zod'

export const createCardBanksSchema = z.object({
  cardNumber: z
    .string()
    .nonempty('Es necesario indicar un número de tarjeta')
    .max(32, 'El número de tarjeta debe ser menor a 32 carácteres numéricos')
    .regex(/^\d+$/, 'El número de tarjeta debe contener solo números'),
  bank: z
    .string()
    .nonempty('Es necesario indicar un nombre de banco')
    .max(32, 'El nombre de banco debe ser menor a 32 carácteres')
})

export const updateCardBanksSchema = z.object({
  bank: z
    .string()
    .nonempty('Es necesario indicar un nombre de banco')
    .max(32, 'El nombre de banco debe ser menor a 32 carácteres')
})
