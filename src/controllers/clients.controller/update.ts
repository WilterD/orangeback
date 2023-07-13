import { Request, Response } from "express";
import { pool } from "../../database";
import { STATUS } from "../../utils/constants";
import { handleControllerError } from "../../utils/responses/handleControllerError";
import { StatusError } from "../../utils/responses/status-error";

const getClientsUpdateDataFromRequestBody = (req: Request): any[] => {
  const { name, email, mainPhone, secondaryPhone } = req.body;

  const updatedClient = [name, email, mainPhone, secondaryPhone];
  return updatedClient;
};

export const updateClient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedClient = getClientsUpdateDataFromRequestBody(req);
    updatedClient.push(req.params.clientDni);
    const response = await pool.query({
      text: `UPDATE 
              clients 
            SET 
              name = $1, 
              email = $2, 
              main_phone = $3, 
              secondary_phone = $4 
            WHERE 
              client_dni = $5`,
      values: updatedClient,
    });
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.clientDni}`,
        statusCode: STATUS.NOT_FOUND,
      });
    }

    return res
      .status(STATUS.OK)
      .json({ message: "Cliente modificado exitosamente" });
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
