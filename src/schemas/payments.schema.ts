import { z } from 'zod'

export const createPaymentsSchema = z.object({
  billId: z
    .number(),
  amount: z
    .number(),
  paymentDate: z
    .string()
    .nonempty('Debe especificar una fecha y tiempo para el pago')
    .refine(
      (fecha) => {
        const regex = /^(\d{2})-(\d{2})-(\d{4})\s+(\d{2}):(\d{2}):(\d{2})$/
        if (!regex.test(fecha)) {
          return false
        }
        const [dia, mes, anio, hora, minutos, segundos] = fecha.split(/[-\s:]/).map(Number)
        if (dia < 1 || dia > 30 || mes < 1 || mes > 12 || anio < 1900 || anio > 2100 ||
        hora < 0 || hora > 23 || minutos < 0 || minutos > 59 || segundos < 0 || segundos > 59) {
          return false
        }
        return true
      },
      {
        message: 'La fecha debe estar en formato DD-MM-AAAA HH:MM:SS y ser una fecha válida y dentro de los límites permitidos'
      }
    ),
  paymentMethod: z
    .enum(['E', 'D', 'T', 'TD', 'TC']),
  cardNumber: z
    .string()
    .nonempty('Es necesario indicar un numero de tarjeta')
    .max(32, 'La tarjeta debe ser menor a 32  carácteres')
    .regex(/^\d+$/, 'La tarjeta debe contener solo números')
    .nullable()
}).refine(({ paymentMethod, cardNumber }) => {
  // Si paymentMethod es TD o TC, cardNumber no puede ser nulo
  if (['TD', 'TC'].includes(paymentMethod)) {
    return cardNumber !== null
  }
  // Si paymentMethod es E, D, o T, cardNumber puede ser nulo
  return true
}, {
  message: 'El número de tarjeta es requerido para TD o TC',
  path: ['cardNumber']
})

export const updatePaymentsSchema = z.object({
  amount: z
    .number(),
  paymentDate: z
    .string()
    .nonempty('Debe especificar una fecha y tiempo para el pago')
    .refine(
      (fecha) => {
        const regex = /^(\d{2})-(\d{2})-(\d{4})\s+(\d{2}):(\d{2}):(\d{2})$/
        if (!regex.test(fecha)) {
          return false
        }
        const [dia, mes, anio, hora, minutos, segundos] = fecha.split(/[-\s:]/).map(Number)
        if (dia < 1 || dia > 30 || mes < 1 || mes > 12 || anio < 1900 || anio > 2100 ||
        hora < 0 || hora > 23 || minutos < 0 || minutos > 59 || segundos < 0 || segundos > 59) {
          return false
        }
        return true
      },
      {
        message: 'La fecha debe estar en formato DD-MM-AAAA HH:MM:SS y ser una fecha válida y dentro de los límites permitidos'
      }
    ),
  paymentMethod: z
    .enum(['E', 'D', 'T', 'TD', 'TC']),
  cardNumber: z
    .string()
    .nonempty('Es necesario indicar un numero de tarjeta')
    .max(32, 'La tarjeta debe ser menor a 32  carácteres')
    .regex(/^\d+$/, 'La tarjeta debe contener solo números')
    .nullable()
}).refine(({ paymentMethod, cardNumber }) => {
  // Si paymentMethod es TD o TC, cardNumber no puede ser nulo
  if (['TD', 'TC'].includes(paymentMethod)) {
    return cardNumber !== null
  }
  // Si paymentMethod es E, D, o T, cardNumber puede ser nulo
  return true
}, {
  message: 'El número de tarjeta es requerido para TD o TC',
  path: ['cardNumber']
})
