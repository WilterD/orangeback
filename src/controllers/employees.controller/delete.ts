import { Request, Response } from "express";
import { pool } from "../../database";
import { STATUS } from "../../utils/constants";
import { StatusError } from "../../utils/responses/status-error";
import { handleControllerError } from "../../utils/responses/handleControllerError";

export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: `DELETE FROM 
          employees 
        WHERE 
          employee_dni = $1`,
      values: [req.params.employeeDni],
    });
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.employeeDni}`,
        statusCode: STATUS.NOT_FOUND,
      });
    }
    return res
      .status(STATUS.OK)
      .json({ message: "Empleado Eliminado exitosamente" });
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
