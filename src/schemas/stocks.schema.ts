import { z } from 'zod'

export const createStockSchema = z.object({
  agencyRif: z
    .string()
    .nonempty('Es necesario indicar una descripción del servicio')
    .max(32, 'La descripción del servicio es muy larga'),
  productId: z
    .string()
    .nonempty('Es necesario indicar una descripción del servicio')
    .max(32, 'La descripción del servicio es muy larga'),
  onStock: z
    .number(),
  maxCapacity: z
    .number(),
  minCapacity: z
    .number()
})

export const updateStockSchema = z.object({
  onStock: z
    .number(),
  maxCapacity: z
    .number(),
  minCapacity: z
    .number()
})
