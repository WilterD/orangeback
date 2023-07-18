/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { StatusError } from '../../utils/responses/status-error'

const getAgenciesCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    agencyRif,
    businessName,
    managerDni,
    cityId
  } = req.body
  const newAgency = [
    agencyRif,
    businessName,
    managerDni,
    cityId
  ]
  return newAgency
}

export const addAgency = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newAgency = getAgenciesCreateDataFromRequestBody(req)

    const { rows: alreadyHasAnAgency } = await pool.query({
      text: `
        SELECT COUNT(*)
        FROM agencies
        WHERE manager_dni = $1
      `,
      values: [req.body.managerDni]
    })

    if (alreadyHasAnAgency[0].count > 0) {
      throw new StatusError({
        message: `Ya el encargado de DNI: ${req.body.managerDni} se está encargando de una agencia`,
        statusCode: STATUS.NOT_FOUND
      })
    }

    const insertar = await pool.query({
      text: `
            INSERT INTO 
              agencies
              (agency_rif, business_name, manager_dni, city_id)
            VALUES
              ($1, $2, $3, $4)
            RETURNING agency_rif
            `,
      values: newAgency
    })
    const insertedId: string = insertar.rows[0].agency_rif
    const response = await pool.query({
      text: 'SELECT * FROM agencies WHERE agency_rif = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
