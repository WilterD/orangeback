import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

const getStatesDataFromRequestBody = (req: Request): any[] => {
  const { name } = req.body
  const newState = [name]
  return newState
}

export const addState = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newState = getStatesDataFromRequestBody(req)

    const insertar = await pool.query({
      text: `INSERT INTO states (name) 
              VALUES ($1) RETURNING state_id`,
      values: newState
    })
    const insertedId: string = insertar.rows[0].state_id
    const response = await pool.query({
      text: `SELECT * 
                FROM states 
                WHERE state_id = $1`,
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
