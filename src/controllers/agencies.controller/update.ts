import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getAgenciesUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    businessName,
    managerDni,
    cityId
  } = req.body

  const updatedAgency = [
    businessName,
    managerDni,
    cityId
  ]
  return updatedAgency
}

export const updateAgency = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedAgency = getAgenciesUpdateDataFromRequestBody(req)
    updatedAgency.push(req.params.agencyId)
    const response = await pool.query({
      text: `
            UPDATE
              agencies
            SET
              business_name = $1,
              manager_dni = $2,
              city_id = $3
            WHERE
              agency_rif = $4
            `,
      values: updatedAgency
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.agencyId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Agencia Modificada Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
