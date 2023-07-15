import { Response, Request } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '../database'
import { AUTH_EXPIRE, AUTH_SECRET } from '../config'
import { STATUS } from '../utils/constants'
import { Admin } from '../schemas/admins.schema'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'
import camelizeObject from '../utils/camelizeObject'

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
      text: `SELECT * 
              FROM admins 
              WHERE email = $`,
      values: [loginData[0]]
    })

    const data: Admin = camelizeObject(rows[0]) as Admin

    const isPasswordCorrect =
      rows.length > 0
        ? await bcrypt.compare(loginData[1], data.password)
        : false

    if (rows.length === 0 || !isPasswordCorrect) {
      throw new StatusError({
        message: `Email o Contraseña Incorrecta`,
        statusCode: STATUS.BAD_REQUEST
      })
    }

    const userForToken = {
      id: data.adminId,
      name: data.name,
      email: data.email
    }
    const token = jwt.sign(userForToken, String(AUTH_SECRET), {
      expiresIn: String(AUTH_EXPIRE)
    })

    return res.status(STATUS.ACCEPTED).json({ ...userForToken, token })
  } catch (error: unknown) {
    console.log(error)
    handleControllerError(error, res)

  }
  return undefined
}
