import { z } from 'zod'

export const createModelsSchema = z.object({
  modelId: z
    .string()
    .nonempty('Es necesario indicar el codigo del modelo de vehiculo')
    .max(64, 'el codigo del modelo del vehiculo debe ser menor a 64 carácteres'),
  brand: z
    .string()
    .nonempty('Es necesario indicar una marca del modelo del vehiculo')
    .max(64, 'El nombre debe ser menor a 64 carácteres'),
  description: z
    .string()
    .nonempty('Es necesario agregar una descripcion del modelo')
    .max(64, 'El modelo debe tener menos de 64 caracteres'),
  modelKg: z
    .number(),
  modelYear: z
    .string()
    .nonempty('Es necesario indicar un año de modelo de vehiculo')
    .max(4, 'El año del modelo debe de ser menor de 4 caracteres')
    .regex(/^\d+$/, 'la fecha debe estar escrita en numeros'),
  seatsQuantity: z
    .number(),
  refrigerantType: z
    .string()
    .nonempty('Es necesario indicar un tipo de refrigerante')
    .max(32, 'El nombre del refrigerante debe ser menor a 32 carácteres'),
  engineOilType: z
    .string()
    .nonempty('Es necesario indicar el tipo de aceite del modelo del vehiculo')
    .max(32, 'El tipo de aceite del modelo del vehiculo debe ser menor a 32 carácteres'),
  oilBox: z
    .string()
    .nonempty('Es necesario indicar un modelo de caja de aceite')
    .max(32, 'El modelo de caja de aceite debe ser menor a 32 carácteres'),
  octane: z
    .number()
})

export const updateModelsSchema = z.object({
  brand: z
    .string()
    .nonempty('Es necesario indicar una marca del modelo del vehiculo')
    .max(64, 'El nombre debe ser menor a 64 carácteres'),
  description: z
    .string()
    .nonempty('Es necesario agregar una descripcion del modelo')
    .max(64, 'El modelo debe tener menos de 64 caracteres'),
  modelKg: z
    .number(),
  modelYear: z
    .string()
    .nonempty('Es necesario indicar un año de modelo de vehiculo')
    .max(4, 'El año del modelo debe de ser menor de 4 caracteres')
    .regex(/^\d+$/, 'la fecha debe estar escrita en numeros'),
  seatsQuantity: z
    .number(),
  refrigerantType: z
    .string()
    .nonempty('Es necesario indicar un tipo de refrigerante')
    .max(32, 'El nombre del refrigerante debe ser menor a 32 carácteres'),
  engineOilType: z
    .string()
    .nonempty('Es necesario indicar el tipo de aceite del modelo del vehiculo')
    .max(32, 'El tipo de aceite del modelo del vehiculo debe ser menor a 32 carácteres'),
  oilBox: z
    .string()
    .nonempty('Es necesario indicar un modelo de caja de aceite')
    .max(32, 'El modelo de caja de aceite debe ser menor a 32 carácteres'),
  octane: z
    .number()
})
