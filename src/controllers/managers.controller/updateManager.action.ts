import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'
import { handleControllerError } from '../../utils/responses/handleControllerError'

const getManagersUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    name,
    mainPhone,
    secondaryPhone,
    address,
    email
  } = req.body

  const updatedManager = [
    name,
    mainPhone,
    secondaryPhone,
    address,
    email
  ]
  return updatedManager
}

export default async function updateManager (
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const updatedManager = getManagersUpdateDataFromRequestBody(req)
    updatedManager.push(req.params.managerDni)
    const response = await pool.query({
      text: 'UPDATE managers SET name = $1, main_phone = $2, secondary_phone = $3, address = $4, email = $5 WHERE manager_dni = $6',
      values: updatedManager
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.managerDni}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Encargado modificado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
