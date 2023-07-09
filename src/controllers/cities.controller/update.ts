import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'
import { getCitiesDataFromRequestBody } from './add'

export const updateCity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedCity = getCitiesDataFromRequestBody(req)
    updatedCity.push(req.params.cityId)
    const response = await pool.query({
      text: 'UPDATE cities SET name = $1, state_id = $2 WHERE city_id = $3',
      values: updatedCity
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.cityId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Ciudad modificada exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
