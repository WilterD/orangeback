import { z } from 'zod'

export const createClientsSchema = z.object({
  clientDni: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'la cédula debe ser menor a 16 carácteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números'),
  name: z
    .string()
    .nonempty('Es necesario indicar un nombre de encargado')
    .max(32, 'El nombre debe ser menor a 32 carácteres'),
  email: z
    .string()
    .nonempty('Es necesario indicar un email')
    .max(32, 'El email debe ser menor a 32 carácteres')
    .email('Debe ingresar un email valido'),
  mainPhone: z
    .string()
    .nonempty('Es necesario indicar un número de teléfono principal')
    .max(16, 'El teléfono principal debe ser menor a 16 carácteres')
    .regex(/^\d+$/, 'el teléfono debe contener solo números'),
  secondaryPhone: z
    .string()
    .nonempty('Es necesario indicar un número de teléfono secundario')
    .max(16, 'El teléfono secundario debe ser menor a 16 carácteres')
    .regex(/^\d+$/, 'el teléfono debe contener solo números')
})

export const updateClientsSchema = z.object({
  name: z
    .string()
    .nonempty('Es necesario indicar un nombre de encargado')
    .max(32, 'El nombre debe ser menor a 32 carácteres'),
  email: z
    .string()
    .nonempty('Es necesario indicar un email')
    .max(32, 'El email debe ser menor a 32 carácteres')
    .email('Debe ingresar un email valido'),
  mainPhone: z
    .string()
    .nonempty('Es necesario indicar un número de teléfono principal')
    .max(16, 'El teléfono principal debe ser menor a 16 carácteres')
    .regex(/^\d+$/, 'el teléfono debe contener solo números'),
  secondaryPhone: z
    .string()
    .nonempty('Es necesario indicar un número de teléfono secundario')
    .max(16, 'El teléfono secundario debe ser menor a 16 carácteres')
    .regex(/^\d+$/, 'el teléfono debe contener solo números')
})
