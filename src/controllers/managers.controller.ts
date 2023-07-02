/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from "express";
import { pool } from "../database";
import { DEFAULT_PAGE, STATUS } from "../utils/constants";
import {
  PaginateSettings,
  paginatedItemsResponse,
  successItemsResponse,
  successResponse,
} from "../utils/responses";
import { StatusError } from "../utils/responses/status-error";
import { handleControllerError } from "../utils/responses/handleControllerError";

export const getManagers = async (
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
      text: "SELECT * FROM managers",
    });
    if (isEmpty.rowCount === 0) {
      throw new StatusError({
        message: "La tabla está vacía",
        statusCode: STATUS.NOT_FOUND,
      });
    }
    const response = await pool.query({
      text: "SELECT * FROM managers ORDER BY manager_dni LIMIT $1 OFFSET $2",
      values: [size, offset],
    });
    const pagination: PaginateSettings = {
      total: response.rowCount,
      currentPage: Number(page),
      perPage: Number(size),
    };
    return paginatedItemsResponse(res, STATUS.OK, response.rows, pagination);
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};

export const getManagerById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM managers WHERE manager_dni = $1",
      values: [req.params.managerId],
    });
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.managerId}`,
        statusCode: STATUS.NOT_FOUND,
      });
    }
    return successResponse(res, STATUS.OK, response.rows[0]);
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};

const getManagersDataFromRequestBody = (req: Request): any[] => {
  const {
    manager_dni,
    name,
    main_phone,
    secondary_phone,
    address, 
    email 
  } = req.body;
  const newManager = [
    manager_dni,
    name,
    main_phone,
    secondary_phone,
    address, 
    email
  ];
  return newManager;
};

export const addManager = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newManager = getManagersDataFromRequestBody(req);

    const insertar = await pool.query({
      text: "INSERT INTO managers (manager_dni,name,main_phone,secondary_phone,address,email) VALUES ($1,$2,$3,$4,$5,$6) RETURNING manager_dni",
      values: newManager,
    });
    const insertedId: string = insertar.rows[0].manager_dni;
    const response = await pool.query({
      text: `SELECT * FROM managers WHERE manager_dni = ${insertedId}`,
    });
    return successItemsResponse(res, STATUS.CREATED, response.rows[0]);
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res);
  }
};

export const updateManager = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedManager = getManagersDataFromRequestBody(req);
    updatedManager.push(req.params.managerId);
    const response = await pool.query({
      text: "UPDATE managers SET name = $1, main_phone = $2, secondary_phone = $3, address = $4, email = $5 WHERE manager_dni = $6",
      values: updatedManager,
    });
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.managerId}`,
        statusCode: STATUS.NOT_FOUND,
      });
    }
    return successResponse(res, STATUS.OK, "Manager modificado exitosamente");
  } catch (error: unknown) {
    console.log(error);
    return handleControllerError(error, res);
  }
};

export const deleteManager = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: "DELETE FROM managers WHERE manager_dni = $1",
      values: [req.params.managerId],
    });
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.managerId}`,
        statusCode: STATUS.NOT_FOUND,
      });
    }
    return successResponse(res, STATUS.OK, "Manager eliminado");
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
