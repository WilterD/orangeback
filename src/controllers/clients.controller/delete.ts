import { Request, Response } from "express";
import { pool } from "../../database";
import { STATUS } from "../../utils/constants";
import { StatusError } from "../../utils/responses/status-error";
import { handleControllerError } from "../../utils/responses/handleControllerError";

export const deleteClient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: `SELECT 
                * 
              FROM 
                clients 
              WHERE 
                client_dni = $1`,
      values: [req.params.clientDni],
    });
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.clientDni}`,
        statusCode: STATUS.NOT_FOUND,
      });
    }
    return res
      .status(STATUS.OK)
      .json({ message: "Cliente Eliminado exitosamente" });
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
