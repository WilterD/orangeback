import { Request, Response } from "express";
import { pool } from "../../database";
import { STATUS } from "../../utils/constants";
import { handleControllerError } from "../../utils/responses/handleControllerError";
import camelizeObject from "../../utils/camelizeObject";
import { StatusError } from "../../utils/responses/status-error";

export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const responseEmployee = await pool.query({
      text: `SELECT 
                * 
              FROM 
                employees 
              WHERE 
                employee_dni = $1`,
      values: [req.params.employeeDni],
    });
    if (responseEmployee.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.employeeDni}`,
        statusCode: STATUS.NOT_FOUND,
      });
    }
    const responseServices = await pool.query({
      text: `SELECT 
              s.service_id, 
              s.description 
            FROM 
              services AS s, 
              employees_specialties AS es 
            WHERE 
              es.employee_dni = $1 
              AND es.service_id = s.service_id`,
      values: [req.params.employeeDni],
    });
    return res.status(STATUS.OK).json({
      ...camelizeObject(responseEmployee.rows[0]),
      services: camelizeObject(responseServices.rows),
    });
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
