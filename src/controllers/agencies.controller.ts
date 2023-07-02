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

export const getAgencies = async (
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
      text: "SELECT * FROM agencies",
    });
    if (isEmpty.rowCount === 0) {
      throw new StatusError({
        message: "La tabla está vacía",
        statusCode: STATUS.NOT_FOUND,
      });
    }
    const response = await pool.query({
      text: "SELECT * FROM agencies ORDER BY agency_rif LIMIT $1 OFFSET $2",
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

export const getAgencyById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM agencies WHERE agency_rif = $1",
      values: [req.params.agencyId],
    });
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de: ${req.params.agencyId}`,
        statusCode: STATUS.NOT_FOUND,
      });
    }
    return successResponse(res, STATUS.OK, response.rows[0]);
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};

const getAgenciesDataFromRequestBody = (req: Request): any[] => {
  const {
    agency_rif,
    business_name,
    agency_name,
    manager_dni,
    city_id, 
    created_at 
  } = req.body;
  const newAgency = [
    agency_rif,
    business_name,
    agency_name,
    manager_dni,
    city_id, 
    created_at
  ];
  return newAgency;
};

export const addAgency = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newAgency = getAgenciesDataFromRequestBody(req);

    const insertar = await pool.query({
      text: "INSERT INTO agencies (agency_rif,business_name,agency_name,manager_dni,city_id,created_at) VALUES ($1,$2,$3,$4,$5,$6) RETURNING agency_rif",
      values: newAgency,
    });
    const insertedId: string = insertar.rows[0].agency_rif;
    const response = await pool.query({
      text: `SELECT * FROM agencies WHERE agency_rif = ${insertedId}`,
    });
    return successItemsResponse(res, STATUS.CREATED, response.rows[0]);
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res);
  }
};

export const updateAgency = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedAgency = getAgenciesDataFromRequestBody(req);
    updatedAgency.push(req.params.agencyId);
    const response = await pool.query({
      text: "UPDATE agencies SET agency_rif = $1, business_name = $2, agency_name = $3, manager_dni = $4, city_id = $5, created_at = $6 WHERE agency_rif = $7",
      values: updatedAgency,
    });
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.agencyId}`,
        statusCode: STATUS.NOT_FOUND,
      });
    }
    return successResponse(res, STATUS.OK, "Agencia modificada éxitosamente");
  } catch (error: unknown) {
    console.log(error);
    return handleControllerError(error, res);
  }
};

export const deleteAgency = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: "DELETE FROM agencies WHERE agency_rif = $1",
      values: [req.params.agencyId],
    });
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.agencyId}`,
        statusCode: STATUS.NOT_FOUND,
      });
    }
    return successResponse(res, STATUS.OK, "Agencia eliminada");
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
