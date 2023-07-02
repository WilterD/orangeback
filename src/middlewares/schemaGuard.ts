import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'
import { errorResponse } from '../utils/responses'
import { STATUS } from '../utils/constants'
import { handleControllerError } from '../utils/responses/handleControllerError'

export const schemaGuard =
  (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body)
        return next()
      } catch (error) {
        if (error instanceof ZodError) {
          return errorResponse(res, STATUS.BAD_REQUEST, 'Datos invalidos en formulario',
            error.issues.map((issue) => ({
              field: String(issue.path),
              message: issue.message
            })))
        }
        handleControllerError(error, res)
      }
    }
