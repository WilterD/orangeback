import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'
import { handleControllerError } from '../../utils/responses/handleControllerError'

export default async function deleteManager (
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const response = await pool.query({
      text: 'DELETE FROM managers WHERE manager_dni = $1',
      values: [req.params.managerDni]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.managerDni}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Encargado eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
