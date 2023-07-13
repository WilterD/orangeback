import { Request, Response } from "express";
import { pool } from "../../database";
import { DEFAULT_PAGE, STATUS } from "../../utils/constants";
import {
  PaginateSettings,
  paginatedItemsResponse,
} from "../../utils/responses";
import { handleControllerError } from "../../utils/responses/handleControllerError";
import camelizeObject from "../../utils/camelizeObject";

export const getEmployees = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query;

  try {
    let offset = (Number(page) - 1) * Number(size);

    if (Number(page) < 1) {
      offset = 0;
    }

    const isEmpty = await pool.query({
      text: `SELECT 
                *
                FROM 
                employees`,
    });
    if (isEmpty.rowCount === 0) {
      return res.status(STATUS.OK).json([]);
    }
    const response = await pool.query({
      text: `SELECT 
              * 
            FROM 
              employees 
            ORDER BY 
              name 
            LIMIT 
              $1 OFFSET $2`,
      values: [size, offset],
    });
    const pagination: PaginateSettings = {
      total: response.rowCount,
      page: Number(page),
      perPage: Number(size),
    };
    return paginatedItemsResponse(
      res,
      STATUS.OK,
      camelizeObject(response.rows) as any,
      pagination
    );
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
