import { z } from "zod";

export const updateEmployeeSchema = z.object({
  name: z
    .string()
    .nonempty("Es necesario indicar un nombre de encargado")
    .max(32, "El nombre debe ser menor a 32 carácteres"),
  main_phone: z
    .string()
    .nonempty("Es necesario indicar un número de teléfono principal")
    .max(16, "El teléfono principal debe ser menor a 16 carácteres")
    .regex(/^\d+$/, "el teléfono debe contener solo números"),
  secondary_phone: z
    .string()
    .nonempty("Es necesario indicar un número de teléfono secundario")
    .max(16, "El teléfono secundario debe ser menor a 16 carácteres")
    .regex(/^\d+$/, "el teléfono debe contener solo números"),
  address: z
    .string()
    .nonempty("Es necesario indicar una dirección")
    .max(255, "la dirección debe ser menor a 255 carácteres"),
  email: z
    .string()
    .nonempty("Es necesario indicar un email")
    .max(32, "El email debe ser menor a 32 carácteres")
    .email("Debe ingresar un email valido"),
});
