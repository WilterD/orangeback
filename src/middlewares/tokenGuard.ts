import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { STATUS } from '../utils/constants'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'
import { errorResponse } from '../utils/responses'

const schema = z.object({
  authorization: z.string().refine((value) => {
    if (!value.startsWith('Bearer')) {
      throw new StatusError({
        message: 'Autorización Bearer necesaria',
        statusCode: STATUS.UNAUTHORIZED
      })
    }
    return true
  })
})

export const tokenGuard =
  () => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.headers)
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        return errorResponse(res, STATUS.BAD_REQUEST, 'Error de Token',
          error.issues.map((issue) => ({
            field: String(issue.path),
            message: issue.message
          })))
      }
      handleControllerError(error, res)
    }
  }
