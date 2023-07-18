import { z } from 'zod'

export const createBookingsSchema = z.object({
  expirationDate: z
    .string()
    .nonempty('Debe especificar una fecha de expiración para la reserva')
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
  clientDni: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'la cédula debe ser menor a 16 carácteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números'),
  licensePlate: z
    .string()
    .nonempty('Es necesario indicar una placa de vehículo')
    .max(16, 'La placa del vehículo debe ser menor a 16 carácteres'),
  agencyRif: z
    .string()
    .nonempty('Es necesario indicar un rif')
    .max(32, 'El Rif debe ser menor a 32  carácteres'),
  servicesIds: z
    .array(z.number().min(1, 'El id de servicio debe ser mayor o igual a 1'))
    .nonempty('Es necesario indicar al menos un id de servicio')
})

export const updateBookingsSchema = z.object({
  expirationDate: z
    .string()
    .nonempty('Debe especificar una fecha de expiración para la reserva')
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
  servicesIds: z
    .array(z.number().min(1, 'El id de servicio debe ser mayor o igual a 1'))
    .nonempty('Es necesario indicar al menos un id de servicio')
})
