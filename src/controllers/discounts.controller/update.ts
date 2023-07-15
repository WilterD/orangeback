import { Request, Response } from "express";
import { pool } from "../../database";
import { STATUS } from "../../utils/constants";
import { handleControllerError } from "../../utils/responses/handleControllerError";
import { StatusError } from "../../utils/responses/status-error";
import { getDiscountsDataFromRequestBody } from "./add";

export const updateDiscount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedDiscount = getDiscountsDataFromRequestBody(req);
    updatedDiscount.push(req.params.discountId);
    const response = await pool.query({
      text: `UPDATE 
              discounts 
            SET 
              percentage = $1, 
              services_min = $2, 
              services_max = $3, 
              agency_rif = $4 
            WHERE 
              discount_id = $5`,
      values: updatedDiscount,
    });
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.discountId}`,
        statusCode: STATUS.NOT_FOUND,
      });
    }

    return res
      .status(STATUS.OK)
      .json({ message: "Descuento modificado exitosamente" });
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
