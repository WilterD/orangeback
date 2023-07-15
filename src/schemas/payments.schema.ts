import { z } from 'zod'

export const createPaymentsSchema = z.object({
  billId: z
    .number(),
    paymentId: z
    .number(),
    cost: z
    .number(),
    paymentDate: z
    .string().refine(
        (fecha) => {
          const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
          return regex.test(fecha)
        },
        {
          message:
            'La fecha debe estar en formato DD-MM-AAAA y ser una fecha válida'
        }
      ),
    paymentMethod: z
    .string()
    .nonempty('Es necesario indicar un metodo de pago')
    .max(2, 'El metodo de pago debe ser menor a 3 carácteres'),
    cardNumber: z
    .string()
    .nonempty('Es necesario indicar un numero de tarjeta')
    .max(32, 'La tarjeta debe ser menor a 32  carácteres')
    .regex(/^\d+$/, 'La tarjeta debe contener solo números')
})

export const updatePaymentsSchema = z.object({
    cost: z
    .number(),
    paymentDate: z
    .string().refine(
        (fecha) => {
          const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
          return regex.test(fecha)
        },
        {
          message:
            'La fecha debe estar en formato DD-MM-AAAA y ser una fecha válida'
        }
      ),
    paymentMethod: z
    .string()
    .nonempty('Es necesario indicar un metodo de pago')
    .max(2, 'El metodo de pago debe ser menor a 3 carácteres'),
    cardNumber: z
    .string()
    .nonempty('Es necesario indicar un numero de tarjeta')
    .max(32, 'La tarjeta debe ser menor a 32  carácteres')
    .regex(/^\d+$/, 'La tarjeta debe contener solo números')
})
