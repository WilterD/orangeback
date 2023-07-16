import { z } from 'zod'

export const createProductsSchema = z.object({
  productId: z
    .string()
    .nonempty('Es necesario indicar una descripción del servicio')
    .max(32, 'La descripción del servicio es muy larga'),
  shortNameProduct: z
    .string()
    .nonempty('Es necesario indicar una descripción del servicio')
    .max(255, 'La descripción del servicio es muy larga'),
  description: z
    .string()
    .nonempty('Es necesario indicar una descripción del servicio')
    .max(255, 'La descripción del servicio es muy larga'),
  provider: z
    .string()
    .nonempty('Es necesario indicar una descripción del servicio')
    .max(64, 'La descripción del servicio es muy larga'),
  isEcological: z
    .boolean(),
  price: z
    .number()
    .min(1, 'La cantidad de asientos debe ser mayor o igual a 1'),
  supplyLineId: z
    .number()
    .min(1, 'La cantidad de asientos debe ser mayor o igual a 1')
})

export const updateProductsSchema = z.object({
  shortNameProduct: z
    .string()
    .nonempty('Es necesario indicar una descripción del servicio')
    .max(255, 'La descripción del servicio es muy larga'),
  description: z
    .string()
    .nonempty('Es necesario indicar una descripción del servicio')
    .max(255, 'La descripción del servicio es muy larga'),
  provider: z
    .string()
    .nonempty('Es necesario indicar una descripción del servicio')
    .max(64, 'La descripción del servicio es muy larga'),
  isEcological: z
    .boolean(),
  price: z
    .number()
    .min(1, 'La cantidad de asientos debe ser mayor o igual a 1'),
  supplyLineId: z
    .number()
    .min(1, 'La cantidad de asientos debe ser mayor o igual a 1')
})
