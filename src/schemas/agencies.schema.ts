import { z } from "zod";

export const agenciesSchema = z.object({
    agency_rif: z
    .string()
    .nonempty("Es necesario indicar un rif")
    .max(32, "El Rif debe ser menor a 32  carácteres")
    .regex(/^\d+$/, "El Rif debe contener solo números"),
    business_name: z
    .string()
    .nonempty("Es necesario indicar un nombre de agencia")
    .max(64, "El nombre debe ser menor a 64 carácteres"),
    agency_name: z
    .string()
    .nonempty("Es necesario indicar un nombre de agencia")
    .max(64, "El nombre debe ser menor a 64 carácteres"),
    manager_dni: z
    .string()
    .nonempty("Es necesario indicar una cédula")
    .max(16, "la cédula debe ser menor a 16  carácteres")
    .regex(/^\d+$/, "La cédula debe contener solo números"),
    city_id: z
    .string()
    .nonempty("Es necesario indicar una ciudad")
    .regex(/^\d+$/, "La ciudad debe contener solo números"),
    created_at: z
    .string()
    .nonempty("Es necesario indicar una fecha")
});
