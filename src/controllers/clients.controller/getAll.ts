import { Request, Response } from "express";
import { pool } from "../../database";
import camelizeObject from "../../utils/camelizeObject";
import { handleControllerError } from "../../utils/responses/handleControllerError";
import { STATUS } from "../../utils/constants";

export const getAllClients = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try {
    const { rows } = await pool.query({
      text: `SELECT 
                * 
              FROM 
                clients 
              ORDER BY 
                name`
    })
    return res.status(STATUS.OK).json(camelizeObject(rows))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
};
