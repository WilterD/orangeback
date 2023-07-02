import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { STATUS } from '../utils/constants'
import { AUTH_SECRET } from '../config'
import { errorResponse } from '../utils/responses'

export const verifyToken =
  () =>
    (req: Request, res: Response, next: NextFunction): any => {
      const token = req.headers.authorization?.split(' ')[1]

      try {
        jwt.verify(String(token), String(AUTH_SECRET))
        return next()
      } catch (error) {
        errorResponse(res, STATUS.UNAUTHORIZED, 'Error al decodificar el token')
      }
    }
