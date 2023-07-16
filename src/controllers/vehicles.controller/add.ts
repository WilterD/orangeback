import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

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
      text: `INSERT INTO vehicles (
                license_plate, nro_serial, nro_motor, 
                sale_date, color, extra_descriptions, 
                maintenance_summary, agency_seller, 
                model_id, client_dni) 
              VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING license_plate`,
      values: newVehicle
    })
    const insertedId: string = insertar.rows[0].license_plate
    const response = await pool.query({
      text: `SELECT * 
              FROM vehicles
              WHERE license_plate = $1`,
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
