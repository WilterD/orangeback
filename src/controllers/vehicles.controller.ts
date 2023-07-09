import { Request, Response } from 'express'
import { pool } from '../database'
import { DEFAULT_PAGE, STATUS } from '../utils/constants'
import {
  PaginateSettings,
  paginatedItemsResponse
} from '../utils/responses'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'
import camelizeObject from '../utils/camelizeObject'

export const getVehicles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query

  try {
    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const { rows } = await pool.query({
      text: 'SELECT COUNT(*) FROM vehicles'
    })

    const response = await pool.query({
      text: 'SELECT * FROM vehicles ORDER BY license_plate LIMIT $1 OFFSET $2',
      values: [size, offset]
    })
    const pagination: PaginateSettings = {
      total: Number(rows[0].count),
      page: Number(page),
      perPage: Number(size)
    }
    return paginatedItemsResponse(res, STATUS.OK, camelizeObject(response.rows) as any, pagination)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const getVehicleById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM vehicles WHERE license_plate = $1',
      values: [req.params.licensePlate]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.licensePlate}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getVehiclesCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    licensePlate,
    nroSerial,
    nroMotor,
    saleDate,
    color,
    extraDescriptions,
    maintenanceSummary,
    agencySeller,
    modelId,
    clientDni
  } = req.body
  const newVehicle = [
    licensePlate,
    nroSerial,
    nroMotor,
    saleDate,
    color,
    extraDescriptions,
    maintenanceSummary,
    agencySeller,
    modelId,
    clientDni
  ]
  return newVehicle
}

export const addVehicle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newVehicle = getVehiclesCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO vehicles (license_plate, nro_serial, nro_motor, sale_date, color, extra_descriptions, maintenance_summary, agency_seller, model_id, client_dni) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING license_plate',
      values: newVehicle
    })
    const insertedId: string = insertar.rows[0].license_plate
    const response = await pool.query({
      text: 'SELECT * FROM vehicles WHERE license_plate = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getVehiclesUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    saleDate,
    color,
    extraDescriptions,
    maintenanceSummary,
    agencySeller,
    modelId,
    clientDni
  } = req.body

  const updatedVehicle = [
    saleDate,
    color,
    extraDescriptions,
    maintenanceSummary,
    agencySeller,
    modelId,
    clientDni
  ]
  return updatedVehicle
}

export const updateVehicle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedVehicle = getVehiclesUpdateDataFromRequestBody(req)
    updatedVehicle.push(req.params.licensePlate)
    const response = await pool.query({
      text: 'UPDATE vehicles SET sale_date = $1, color = $2, extra_descriptions = $3, maintenance_summary = $4, agency_seller = $5, model_id = $6, client_dni = $7 WHERE license_plate = $8',
      values: updatedVehicle
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.licensePlate}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Vehículo Modificado Exitosamente' })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

export const deleteVehicle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM vehicles WHERE license_plate = $1',
      values: [req.params.licensePlate]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.licensePlate}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Vehículo Eliminado Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
