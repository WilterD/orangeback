import { z } from 'zod'

export const createBillingActivitySchema = z.object({
  serviceId: z
    .number()
    .min(1, 'el id debe ser mayor o igual a 1'),
  activityId: z
    .number()
    .min(1, 'el id debe ser mayor o igual a 1'),
  orderId: z
    .number()
    .min(1, 'el id debe ser mayor o igual a 1'),
  employeeDni: z
    .string()
    .nonempty('La cantidad de asientos debe ser mayor o igual a 1')
})

export const updateBillingActivitySchema = z.object({
  employeeDni: z
    .string()
    .nonempty('el id de empleado debe existir'),
  costHour: z
    .number()
    .min(0.1, 'La cantidad de costo por hora debe ser mayor o igual a 0.1'),
  hoursTaken: z
    .number()
    .min(0.1, 'la cantidad de horas debe ser al menos 0.1')
})
