import { z } from 'zod'

export const createOrdersSchema = z.object({
  responsible_dni: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'La cédula debe ser menor a 16 caracteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números')
    .optional(),
  responsible_name: z
    .string()
    .nonempty('Es necesario indicar un nombre de encargado')
    .max(64, 'El nombre debe ser menor a 64 caracteres')
    .optional(),
  entry_time: z
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
  estimated_departure: z
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
  real_departure: z
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
    .optional(),
  booking_id: z
    .number(),
  employee_dni: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'La cédula debe ser menor a 16 caracteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números')
})

export const updateOrdersSchema = z.object({
  responsible_dni: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'La cédula debe ser menor a 16 caracteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números'),
  responsible_name: z
    .string()
    .nonempty('Es necesario indicar un nombre de encargado')
    .max(64, 'El nombre debe ser menor a 64 caracteres'),
  entry_time: z
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
  estimated_departure: z
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
  real_departure: z
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
    .optional(),
  booking_id: z.number(),
  employee_dni: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'La cédula debe ser menor a 16 caracteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números')
})
