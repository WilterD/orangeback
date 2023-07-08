import { z } from 'zod'

export const createEmployeesCoordinateServicesSchema = z.object({
  employeeDni: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'la cédula debe ser menor a 16 carácteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números'),
  serviceId: z
    .number()
    .min(1, 'El id de servicio debe ser mayor o igual a 1'),
  reservationTime: z
    .number()
    .min(1, 'El tiempo de reserva debe ser mayor o igual a 1')
    .max(7, 'El tiempo de reserva debe ser menor o igual a 7'),
  capacity: z
    .number()
    .min(1, 'La capacidad debe ser mayor o igual a 1')
})

export const updateEmployeesCoordinateServicesSchema = z.object({
  reservationTime: z
    .number()
    .min(1, 'El tiempo de reserva debe ser mayor o igual a 1')
    .max(7, 'El tiempo de reserva debe ser menor o igual a 7'),
  capacity: z
    .number()
    .min(1, 'La capacidad debe ser mayor o igual a 1')
})
