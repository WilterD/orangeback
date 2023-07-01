import { Response, Request } from 'express'
import bcrypt from 'bcrypt'
import { pool } from '../database'
import { handleControllerError } from '../utils/responses/handleControllerError'
import { Admin } from '../schemas/admins.schema'
import { STATUS } from '../utils/constants'
import { StatusError } from '../utils/responses/status-error'
import { successResponse } from '../utils/responses'

const getLoginDataFromRequestBody = (req: Request): any[] => {
  const { email, password } = req.body
  const loginData = [email, password]
  return loginData
}

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData = getLoginDataFromRequestBody(req)
    const { rows } = await pool.query({
      text: 'SELECT * FROM admins WHERE email = $1',
      values: [loginData[0]]
    })
    const data: Admin = rows[0]
    const isPasswordCorrect =
      data.name === null
        ? false
        : await bcrypt.compare(loginData[1], data.password)

    if (!isPasswordCorrect) {
      throw new StatusError({
        message: 'Email o Contraseña Incorrecta',
        statusCode: STATUS.BAD_REQUEST
      })
    }
    successResponse(res, STATUS.ACCEPTED, 'Machete')
  } catch (error: unknown) {
    handleControllerError(error, res)
  }
}
