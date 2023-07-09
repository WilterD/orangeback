import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { getAdminsDataFromRequestBody } from './add'
import { StatusError } from '../../utils/responses/status-error'

export const updateAdmin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedAdmin = await getAdminsDataFromRequestBody(req)
    updatedAdmin.push(req.params.adminId)
    const response = await pool.query({
      text: 'UPDATE admins SET name = $1, email = $2, password = $3 WHERE admin_id = $4',
      values: updatedAdmin
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.adminId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Administrador modificado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
