import { z } from "zod";

export const agenciesupdateSchema = z.object({
    business_name: z
    .string()
    .nonempty("Es necesario indicar un nombre de agencia")
    .max(64, "El nombre debe ser menor a 64 carácteres"),
    manager_dni: z
    .string()
    .nonempty("Es necesario indicar una cédula")
    .max(16, "la cédula debe ser menor a 16  carácteres")
    .regex(/^\d+$/, "La cédula debe contener solo números"),
    city_id: z
    .number()
});
