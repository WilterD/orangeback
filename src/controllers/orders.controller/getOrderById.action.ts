import { Request, Response } from 'express'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import getDetailedOrder from './getDetailedOrder'

export default async function getOrderById (
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const order = await getDetailedOrder(req.params.orderId)
    return res.status(STATUS.OK).json(order)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
