import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { errorResponse, errorResponseWithField } from '../utils/responses'
import { STATUS } from '../utils/constants'

const schema = z.object({
  id: z.string().regex(/^\d+$/, "El parámetro 'id' debe ser un número")
})

export const idParamWard =
  () => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params)
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        return errorResponseWithField(
          res,
          STATUS.BAD_REQUEST,
          error.issues[0].path[0],
          error.issues[0].message
        )
      }
      return errorResponse(res, STATUS.INTERNAL_SERVER_ERROR.code, STATUS.INTERNAL_SERVER_ERROR.msg)
    }
  }
