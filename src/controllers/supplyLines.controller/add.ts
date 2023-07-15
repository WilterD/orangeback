import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

const getSupplyLinesDataFromRequestBody = (req: Request): any[] => {
  const { name } = req.body
  const newSupplyLine = [name]
  return newSupplyLine
}

export const addSupplyLine = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newSupplyLine = getSupplyLinesDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO supply_lines (name) VALUES ($1) RETURNING supply_line_id',
      values: newSupplyLine
    })
    const insertedId: string = insertar.rows[0].supply_line_id
    const response = await pool.query({
      text: 'SELECT * FROM supply_lines WHERE supply_line_id = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
