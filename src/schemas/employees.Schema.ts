import { z } from 'zod'

export const createEmployeesSchema = z.object({
  employeeDni: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'la cédula debe ser menor a 16 carácteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números'),
  name: z
    .string()
    .nonempty('Es necesario indicar un nombre de encargado')
    .max(32, 'El nombre debe ser menor a 32 carácteres'),
  phone: z
    .string()
    .nonempty('Es necesario indicar un número de teléfono principal')
    .max(16, 'El teléfono principal debe ser menor a 16 carácteres')
    .regex(/^\d+$/, 'el teléfono debe contener solo números'),
  address: z
    .string()
    .nonempty('Es necesario indicar una dirección')
    .max(255, 'la dirección debe ser menor a 255 carácteres'),
  salary: z
    .number()
    .min(1, 'El salario debe ser mayor o igual a 1'),
  agencyRif: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'la cédula debe ser menor a 16 carácteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números'),
  jobId: z
    .number()
    .min(1, 'El id de cargo debe ser mayor o igual a 1'),
  servicesIds: z
    .array(z.number().min(1, 'El id de servicio debe ser mayor o igual a 1'))
    .nonempty('Es necesario indicar al menos un id de servicio')
})

export const updateEmployeesSchema = z.object({
  name: z
    .string()
    .nonempty('Es necesario indicar un nombre de encargado')
    .max(32, 'El nombre debe ser menor a 32 carácteres'),
  phone: z
    .string()
    .nonempty('Es necesario indicar un número de teléfono principal')
    .max(16, 'El teléfono principal debe ser menor a 16 carácteres')
    .regex(/^\d+$/, 'el teléfono debe contener solo números'),
  address: z
    .string()
    .nonempty('Es necesario indicar una dirección')
    .max(255, 'la dirección debe ser menor a 255 carácteres'),
  salary: z
    .number()
    .min(1, 'El salario debe ser mayor o igual a 1'),
  agencyRif: z
    .string()
    .nonempty('Es necesario indicar una cédula')
    .max(16, 'la cédula debe ser menor a 16 carácteres')
    .regex(/^\d+$/, 'La cédula debe contener solo números'),
  jobId: z
    .number()
    .min(1, 'El id de cargo debe ser mayor o igual a 1'),
  servicesIds: z
    .array(z.number().min(1, 'El id de servicio debe ser mayor o igual a 1'))
    .nonempty('Es necesario indicar al menos un id de servicio')
})

export const getAllEmpAgServ = z.object({
  agencyRif: z
    .string()
    .nonempty('Es necesario indicar un rif')
    .max(32, 'El Rif debe ser menor a 32  carácteres'),
  serviceId: z
    .number()
    .min(1, 'el id debe ser mayor o igual a 1')
})
