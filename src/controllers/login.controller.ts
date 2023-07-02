import { Response, Request } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '../database'
import { AUTH_EXPIRE, AUTH_SECRET } from '../config'
import { STATUS } from '../utils/constants'
import { Admin } from '../schemas/admins.schema'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'

const getLoginDataFromRequestBody = (req: Request): any[] => {
  const { email, password } = req.body
  const loginData = [email, password]
  return loginData
}

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const loginData = getLoginDataFromRequestBody(req)
    const { rows } = await pool.query({
      text: 'SELECT * FROM admins WHERE email = $1',
      values: [loginData[0]]
    })

    const data: Admin = rows[0]

    const isPasswordCorrect =
      rows.length > 0
        ? await bcrypt.compare(loginData[1], data.password)
        : false

    if (rows.length === 0 || !isPasswordCorrect) {
      throw new StatusError({
        message: 'Email o Contraseña Incorrecta',
        statusCode: STATUS.BAD_REQUEST
      })
    }

    const userForToken = {
      id: data.admin_id,
      name: data.name,
      email: data.email
    }
    const token = jwt.sign(userForToken, String(AUTH_SECRET), {
      expiresIn: String(AUTH_EXPIRE)
    })

    return res.status(STATUS.ACCEPTED).json({ ...userForToken, token })
  } catch (error: unknown) {
    handleControllerError(error, res)
  }
  return undefined
}
