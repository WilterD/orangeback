import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

export const getCitiesDataFromRequestBody = (req: Request): any[] => {
  const { name, stateId } = req.body
  const newCity = [name, stateId]
  return newCity
}

export const addCity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newCity = getCitiesDataFromRequestBody(req)

    const insertar = await pool.query({
      text: `INSERT INTO 
              cities (name, state_id)
               VALUES ($1, $2) RETURNING city_id`,
      values: newCity
    })
    const insertedId: string = insertar.rows[0].city_id
    const response = await pool.query({
      text: `SELECT * 
              FROM cities 
              WHERE city_id = $1`,
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
