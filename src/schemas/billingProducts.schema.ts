import { z } from 'zod'

export const createbillingProductsSchema = z.object({
  serviceId: z
    .number()
    .min(1, 'debe existir un id'),
  activityId: z
    .number()
    .min(1, 'debe existir un id'),
  orderId: z
    .number()
    .min(1, 'debe existir un id'),
  productId: z
    .string()
    .nonempty('Es necesario indicar una descripción del producto')
    .max(32, 'La descripción del producto es muy larga')
})

export const updatebillingProductsSchema = z.object({
  price: z
    .number()
    .min(1, 'el precio debe ser mayor o igual a 1'),
  quantity: z
    .number()
    .min(1, 'La cantidad debe ser mayor o igual a 1')
})
