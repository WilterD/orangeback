import { Request, Response } from 'express'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import getManagerById from './getManagerById'

export const getById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const manager = await getManagerById(req.params.managerDni)
    return res.status(STATUS.OK).json(manager)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
