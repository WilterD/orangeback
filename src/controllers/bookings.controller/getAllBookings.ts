import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { Booking } from '../services.controller/types'

const getAllBookings = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const bookings = await executeGetAllBookings({
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      onlyWithoutOrder: !!req.query?.onlyWithoutOrder,
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      includeBookingId: req.query?.includeBookingId ? +req.query?.includeBookingId : null
    })
    return res.status(STATUS.OK).json(bookings)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

async function executeGetAllBookings (body: GetAllManagersOptions): Promise<Booking[]> {
  const whereValues = []
  let text = 'SELECT * FROM bookings'

  if (body.onlyWithoutOrder) {
    let includeBookingIdComplement = ''
    if (body.includeBookingId !== null) {
      whereValues.push(body.includeBookingId)
      includeBookingIdComplement += 'OR booking_id = $1'
    }

    text = `
      SELECT * FROM bookings b
      WHERE NOT EXISTS (
        SELECT *
        FROM orders o
        WHERE o.booking_id = b.booking_id
      ) ${includeBookingIdComplement} 
    `
  }

  const { rows } = await pool.query({ text, values: whereValues })
  return camelizeObject(rows) as unknown as Booking[]
}

interface GetAllManagersOptions {
  onlyWithoutOrder: boolean
  includeBookingId: number | null
}

export default getAllBookings
