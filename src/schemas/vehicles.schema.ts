import { z } from 'zod'

export const createVehiclesSchema = z.object({
  licensePlate: z
    .string()
    .nonempty('Es necesario indicar el codigo del vehiculo')
    .max(16, 'el codigo del vehiculo debe ser menor a 16 carácteres'),
  nroSerial: z
    .string()
    .nonempty('Es necesario indicar una numero de serial del vehiculo')
    .max(64, 'El serial debe ser menor a 64 carácteres'),
  nroMotor: z
    .string()
    .nonempty('Es necesario indicar una numero de motor del vehiculo')
    .max(64, 'El numero de motor debe ser menor a 64 carácteres'),
  saleDate: z
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
  color: z
    .string()
    .nonempty('Es necesario indicar un color del vehiculo')
    .max(32, 'El color debe ser menor de 32 carácteres'),
  extraDescriptions: z
    .string()
    .nonempty('Debe indicar una descripcion extra')
    .max(255, 'la descripcion extra debe ser menor a 255 carácteres'),
  maintenanceSummary: z
    .string()
    .nonempty('Es necesario indicar el tiempo de mantenimiento')
    .max(255, 'El tiempo de mantenimiento debe ser menor a 255 carácteres')
    .optional(),
  agencySeller: z
    .string()
    .nonempty('Es necesario indicar la agencia donde esta el vehiculo')
    .max(64, 'La agencia donde esta el vehiculo debe ser menor a 64 carácteres'),
  modelId: z
    .string()
    .nonempty('Es necesario indicar el modelo del vehiculo')
    .max(64, 'El modelo del vehiculo debe ser menor a 64 carácteres'),
  clientDni: z
    .string()
    .nonempty('Es necesario indicar el dni del cliente')
    .max(16, 'El dni del cliente debe ser menor a 16 caracteres')
})

export const updateVehiclesSchema = z.object({
  saleDate: z
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
  color: z
    .string()
    .nonempty('Es necesario indicar un color del vehiculo')
    .max(32, 'El color debe ser menor de 32 carácteres'),
  extraDescriptions: z
    .string()
    .nonempty('Debe indicar una descripcion extra')
    .max(255, 'la descripcion extra debe ser menor a 255 carácteres'),
  maintenanceSummary: z
    .string()
    .nonempty('Es necesario indicar el tiempo de mantenimiento')
    .max(255, 'El tiempo de mantenimiento debe ser menor a 255 carácteres')
    .optional(),
  agencySeller: z
    .string()
    .nonempty('Es necesario indicar la agencia donde esta el vehiculo')
    .max(64, 'La agencia donde esta el vehiculo debe ser menor a 64 carácteres'),
  modelId: z
    .string()
    .nonempty('Es necesario indicar el modelo del vehiculo')
    .max(64, 'El modelo del vehiculo debe ser menor a 64 carácteres'),
  clientDni: z
    .string()
    .nonempty('Es necesario indicar el dni del cliente')
    .max(16, 'El dni del cliente debe ser menor a 16 caracteres')
})
