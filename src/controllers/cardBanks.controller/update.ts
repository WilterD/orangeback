import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getCardBanksUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    bank
  } = req.body

  const updatedCardBank = [
    bank
  ]
  return updatedCardBank
}

export const updateCardBank = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedCardBank = getCardBanksUpdateDataFromRequestBody(req)
    updatedCardBank.push(req.params.cardbankId)
    const response = await pool.query({
      text: 'UPDATE card_banks SET bank = $1 WHERE card_number = $2',
      values: updatedCardBank
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.cardbankId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Agencia Modificada Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
