import { z } from 'zod'

export const adminsSchema = z.object({
  admin_id: z
    .number()
    .optional(),
  name: z
    .string()
    .nonempty('Es necesario indicar un nombre de administrador')
    .max(64, 'El nombre debe ser menor a 64 carácteres'),
  email: z
    .string()
    .nonempty('Es necesario indicar un correo electrónico')
    .max(64, 'El nombre debe ser menor a 64 carácteres')
    .email('Debe ingresar un email valido'),
  password: z
    .string()
    .nonempty('Es necesario ingresar una contraseña')
    .max(64, 'El nombre debe ser menor a 64 carácteres')
})

export type Admin = z.infer<typeof adminsSchema>
