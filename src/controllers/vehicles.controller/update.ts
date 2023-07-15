import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

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
      text: `UPDATE 
                vehicles 
              SET 
                sale_date = $1, 
                color = $2, 
                extra_descriptions = $3, 
                maintenance_summary = $4, 
                agency_seller = $5, 
                model_id = $6, 
                client_dni = $7 
              WHERE 
                license_plate = $8`,
      values: updatedVehicle
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.licensePlate}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res
      .status(STATUS.OK)
      .json({ message: 'Vehículo Modificado Exitosamente' })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
