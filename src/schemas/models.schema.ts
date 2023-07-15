import { z } from 'zod'

export const isRecommended = z.object({
  serviceId: z.number().min(1, 'El id de servicio debe ser mayor o igual a 1'),
  mileage: z.number().nonnegative('El kilometraje no puede ser negativo'),
  useTime: z.number().nonnegative('El tiempo de uso no puede ser negativo')
})

export const createModelsSchema = z.object({
  modelId: z
    .string()
    .nonempty('Es necesario indicar el codigo del modelo de vehiculo')
    .max(
      64,
      'el codigo del modelo del vehiculo debe ser menor a 64 carácteres'
    ),
  brand: z
    .string()
    .nonempty('Es necesario indicar una marca del modelo del vehiculo')
    .max(64, 'El nombre debe ser menor a 64 carácteres'),
  description: z
    .string()
    .nonempty('Es necesario agregar una descripcion del modelo')
    .max(64, 'El modelo debe tener menos de 64 caracteres'),
  modelKg: z.number().min(1, 'El peso debe ser mayor o igual a 1'),
  modelYear: z
    .string()
    .nonempty('Es necesario indicar un año de modelo de vehiculo')
    .max(4, 'El año del modelo debe de ser menor de 4 caracteres')
    .regex(/^\d+$/, 'la fecha debe estar escrita en numeros'),
  seatsQuantity: z
    .number()
    .min(1, 'La cantidad de asientos debe ser mayor o igual a 1'),
  refrigerantType: z
    .string()
    .nonempty('Es necesario indicar un tipo de refrigerante')
    .max(32, 'El nombre del refrigerante debe ser menor a 32 carácteres'),
  engineOilType: z
    .string()
    .nonempty('Es necesario indicar el tipo de aceite del modelo del vehiculo')
    .max(
      32,
      'El tipo de aceite del modelo del vehiculo debe ser menor a 32 carácteres'
    ),
  oilBox: z
    .string()
    .nonempty('Es necesario indicar un modelo de caja de aceite')
    .max(32, 'El modelo de caja de aceite debe ser menor a 32 carácteres'),
  octane: z.number().min(1, 'El octanaje debe ser mayor o igual a 1'),
  recommendedServices: z.array(isRecommended).optional()
})

export type ModelCreation = z.infer<typeof createModelsSchema>
export type ModelCreatePayload = [
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string,
  number
]
export type ModelUpdate = Omit<ModelCreation, 'modelId'>
export type ModelUpdatePayload = [
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string,
  number
]
export type RecommendedServicesCreatePayload = [number, number, number]

export const updateModelsSchema = z.object({
  brand: z
    .string()
    .nonempty('Es necesario indicar una marca del modelo del vehiculo')
    .max(64, 'El nombre debe ser menor a 64 carácteres'),
  description: z
    .string()
    .nonempty('Es necesario agregar una descripcion del modelo')
    .max(64, 'El modelo debe tener menos de 64 caracteres'),
  modelKg: z.number().min(1, 'El peso debe ser mayor o igual a 1'),
  modelYear: z
    .string()
    .nonempty('Es necesario indicar un año de modelo de vehiculo')
    .max(4, 'El año del modelo debe de ser menor de 4 caracteres')
    .regex(/^\d+$/, 'la fecha debe estar escrita en numeros'),
  seatsQuantity: z
    .number()
    .min(1, 'La cantidad de asientos debe ser mayor o igual a 1'),
  refrigerantType: z
    .string()
    .nonempty('Es necesario indicar un tipo de refrigerante')
    .max(32, 'El nombre del refrigerante debe ser menor a 32 carácteres'),
  engineOilType: z
    .string()
    .nonempty('Es necesario indicar el tipo de aceite del modelo del vehiculo')
    .max(
      32,
      'El tipo de aceite del modelo del vehiculo debe ser menor a 32 carácteres'
    ),
  oilBox: z
    .string()
    .nonempty('Es necesario indicar un modelo de caja de aceite')
    .max(32, 'El modelo de caja de aceite debe ser menor a 32 carácteres'),
  octane: z.number().min(1, 'El octanaje debe ser mayor o igual a 1')
})
