import { z } from "zod";

export const createEmployeeSchema = z.object({
  employee_dni: z
    .string()
    .nonempty("Es necesario indicar una cédula")
    .max(16, "la cédula debe ser menor a 16  carácteres")
    .regex(/^\d+$/, "La cédula debe contener solo números"),
  name: z
    .string()
    .nonempty("Es necesario indicar un nombre de encargado")
    .max(32, "El nombre debe ser menor a 32 carácteres"),
  phone: z
    .string()
    .nonempty("Es necesario indicar un número de teléfono principal")
    .max(16, "El teléfono principal debe ser menor a 16 carácteres")
    .regex(/^\d+$/, "el teléfono debe contener solo números"),
    address: z
    .string()
    .nonempty("Es necesario indicar una dirección")
    .max(255, "la dirección debe ser menor a 255 carácteres"),
    salary: z
    .number(),
    agency_rif: z
    .string()
    .nonempty("Es necesario indicar una cédula")
    .max(16, "la cédula debe ser menor a 16  carácteres")
    .regex(/^\d+$/, "La cédula debe contener solo números"),
    job_id: z
    .number(),
});

