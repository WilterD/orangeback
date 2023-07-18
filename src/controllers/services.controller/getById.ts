import { Request, Response } from 'express'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import getServiceById from './getServiceById.util'

export const getById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const service = await getServiceById(+req.params.serviceId)
    return res.status(STATUS.OK).json(service)
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
