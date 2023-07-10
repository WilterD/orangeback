import { Request, Response } from 'express'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import getBillByIdExecute from './getBillById.utils'

export const getBillById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const bill = await getBillByIdExecute(Number(req.params.billId))
    return res.status(STATUS.OK).json(bill)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
