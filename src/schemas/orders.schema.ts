import { z } from 'zod'

const billingActivitySchema = z.object({
  serviceId: z
    .number()
    .min(1, 'el id debe ser mayor o igual a 1'),
  activityId: z
    .number()
    .min(1, 'el id debe ser mayor o igual a 1'),
  employeeDni: z
    .string()
    .nonempty('el id de empleado debe existir')
})

export const ordersSchema = z.object({
  responsibleDni: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'La cédula debe ser menor a 16 caracteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números')
    .optional()
    .nullable(),
  responsibleName: z
    .string()
    .nonempty('Es necesario indicar un nombre de encargado')
    .max(64, 'El nombre debe ser menor a 64 caracteres')
    .optional()
    .nullable(),
  entryTime: z
    .string()
    .nonempty('Debe especificar una fecha y tiempo de entrada del vehículo')
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
  estimatedDeparture: z
    .string()
    .nonempty('Debe especificar una fecha y tiempo estimado de salida para el vehículo')
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
  realDeparture: z
    .string()
    .nonempty('Debe especificar una fecha y tiempo de salida real del vehículo')
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
    )
    .optional()
    .nullable(),
  bookingId: z
    .number(),
  employeeDni: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'La cédula debe ser menor a 16 caracteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números'),
  activities: z
    .array(billingActivitySchema)
    .min(1, 'Es necesario que la orden tenga al menos una actividad')
})

export type OrderCreate = z.infer<typeof ordersSchema>
