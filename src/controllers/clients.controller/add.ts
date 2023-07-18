import { Request, Response } from "express";
import { pool } from "../../database";
import { STATUS } from "../../utils/constants";
import { handleControllerError } from "../../utils/responses/handleControllerError";
import camelizeObject from "../../utils/camelizeObject";

export const getClientsDataFromRequestBody = (req: Request): any[] => {
  const { clientDni, name, email, mainPhone, secondaryPhone } = req.body
  const newClient = [clientDni, name, email, mainPhone, secondaryPhone]
  return newClient
}

export const addClient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newClient = getClientsDataFromRequestBody(req)

    const insertar = await pool.query({
      text: `INSERT INTO clients (
        client_dni, name, email, main_phone, 
        secondary_phone
      )  VALUES 
        ($1, $2, $3, $4, $5) RETURNING client_dni`,
      values: newClient
    })
    const insertedId: string = insertar.rows[0].client_dni
    const response = await pool.query({
      text: `SELECT 
              * 
              FROM 
                clients 
              WHERE 
                client_dni = $1`,
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
