import { Request, Response } from "express";
import { pool } from "../../database";
import camelizeObject from "../../utils/camelizeObject";
import { handleControllerError } from "../../utils/responses/handleControllerError";
import { STATUS } from "../../utils/constants";

export const getNoEcoProductsAll = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try {
    const { rows } = await pool.query({
      text: `SELECT 100 * SUM(CASE WHEN is_ecological = FALSE THEN on_stock ELSE 0 END) / NULLIF(SUM(on_stock), 0) AS non_ecological_percentage
    FROM 
      products_per_agencies 
      INNER JOIN products ON products_per_agencies.product_id = products.product_id
    WHERE 
      on_stock > 0;`,
    });
    return res.status(STATUS.OK).json(camelizeObject(rows));
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
