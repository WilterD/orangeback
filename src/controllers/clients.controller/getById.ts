import { Request, Response } from "express";
import { pool } from "../../database";
import { STATUS } from "../../utils/constants";
import { handleControllerError } from "../../utils/responses/handleControllerError";
import camelizeObject from "../../utils/camelizeObject";
import { StatusError } from "../../utils/responses/status-error";

export const getClientById = async (
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
      values: [req.params.clientDni]
    });
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.clientDni}`,
        statusCode: STATUS.NOT_FOUND
      });
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
};
