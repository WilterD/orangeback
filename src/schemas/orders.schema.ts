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
  entry_time: z.string().refine(
    (fecha) => {
      const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
      return regex.test(fecha)
    },
    {
      message:
        'La fecha debe estar en formato DD-MM-AAAA y ser una fecha válida'
    }
  ),
  estimated_departure: z
    .string()
    .refine(
      (fecha) => {
        const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
        return regex.test(fecha)
      },
      {
        message:
        'La fecha debe estar en formato DD-MM-AAAA y ser una fecha válida'
      }
    ),
  real_departure: z
    .string()
    .refine(
      (fecha) => {
        const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
        return regex.test(fecha)
      },
      {
        message:
          'La fecha debe estar en formato DD-MM-AAAA y ser una fecha válida'
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
  entry_time: z.string().refine(
    (fecha) => {
      const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
      return regex.test(fecha)
    },
    {
      message:
        'La fecha debe estar en formato DD-MM-AAAA y ser una fecha válida'
    }
  ),
  estimated_departure: z.string().refine(
    (fecha) => {
      const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
      return regex.test(fecha)
    },
    {
      message:
        'La fecha debe estar en formato DD-MM-AAAA y ser una fecha válida'
    }
  ),
  real_departure: z.string().refine(
    (fecha) => {
      const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
      return regex.test(fecha)
    },
    {
      message:
        'La fecha debe estar en formato DD-MM-AAAA y ser una fecha válida'
    }
  ),
  booking_id: z.number(),
  employee_dni: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'La cédula debe ser menor a 16 caracteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números')
})
