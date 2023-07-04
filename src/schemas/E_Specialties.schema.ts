import { z } from 'zod'

export const E_SpecialtySchema = z.object({
  employee_dni: z
  .string()
  .nonempty('Es necesario indicar una cédula')
  .max(16, 'la cédula debe ser menor a 16  carácteres')
  .regex(/^\d+$/, 'La cédula debe contener solo números'),
  service_id: z
    .number()
})
