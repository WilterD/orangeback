import { z } from 'zod'

export const createBillsSchema = z.object({
    bill_date: z
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
    discount_value: z
    .number(),
    total_cost: z
    .number(),
    order_id: z
    .number()
})

export const updateBillsSchema = z.object({
  bill_date: z
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
    discount_value: z
    .number(),
    total_cost: z
    .number(),
    order_id: z
    .number()
})