import { z } from 'zod'

export const createServicesPerModelsSchema = z.object({
  service_id: z
    .number(),
  model_id: z
    .string()
    .nonempty('Es necesario indicar un id')
    .max(64, 'El id debe ser menor a 64 carácteres'),
    mileage: z
    .number(),
    use_time: z
    .number()
})

export const updateServicesPerModelsSchema = z.object({
    mileage: z
    .number(),
    use_time: z
    .number()
})
