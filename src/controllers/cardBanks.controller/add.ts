import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

const getCardBanksCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    cardNumber,
    bank
  } = req.body
  const newCardBank = [
    cardNumber,
    bank
  ]
  return newCardBank
}

export const addCardBank = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newCardBank = getCardBanksCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO card_banks (card_number,bank) VALUES ($1,$2) RETURNING card_number',
      values: newCardBank
    })
    const insertedId: string = insertar.rows[0].card_number
    const response = await pool.query({
      text: 'SELECT * FROM card_banks WHERE card_number = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
