import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { errorResponse, errorResponseWithField } from '../utils/responses'
import { STATUS } from '../utils/constants'

const schema = z.object({
  page: z
    .string()
    .regex(/^\d+$/, 'La página debe ser un número entero')
    .transform((value) => Math.max(parseInt(value), 1))
    .optional(),
  size: z
    .string()
    .regex(/^\d+$/, 'El tamaño debe ser un número entero')
    .transform((value) => Math.max(parseInt(value), 1))
    .optional()
})

export const paginationWard =
  () => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query)
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
