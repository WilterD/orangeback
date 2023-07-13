import { Request, Response } from "express";
import { pool } from "../../database";
import { STATUS } from "../../utils/constants";
import { handleControllerError } from "../../utils/responses/handleControllerError";
import { StatusError } from "../../utils/responses/status-error";

export const deleteDiscount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: `DELETE FROM 
            discounts 
          WHERE 
          discount_id = $1`,
      values: [req.params.discountId],
    });
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.discountId}`,
        statusCode: STATUS.NOT_FOUND,
      });
    }
    return res
      .status(STATUS.OK)
      .json({ message: "Descuento Eliminado exitosamente" });
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
