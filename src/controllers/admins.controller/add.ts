import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { AUTH_ROUNDS } from '../../config'

export const getAdminsDataFromRequestBody = async (req: Request): Promise<any[]> => {
  const { name, email, password } = req.body
  const passwordHash = await bcrypt.hash(password, Number(AUTH_ROUNDS))
  const newAdmin = [name, email, passwordHash]
  return newAdmin
}

export const addAdmin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newAdmin = await getAdminsDataFromRequestBody(req)

    const insertar = await pool.query({
      text: `INSERT INTO admins 
      (name, email, password) 
      VALUES ($1, $2, $3) RETURNING admin_id`,
      values: newAdmin
    })
    const insertedId: string = insertar.rows[0].admin_id
    const response = await pool.query({
      text: `SELECT * 
                FROM admins 
                WHERE admin_id = $1`,
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
