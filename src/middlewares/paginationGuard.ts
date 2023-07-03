import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { errorResponse } from '../utils/responses'
import { STATUS } from '../utils/constants'
import { handleControllerError } from '../utils/responses/handleControllerError'

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

export const paginationGuard =
  () => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query)
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        return errorResponse(res, STATUS.BAD_REQUEST, 'Datos invalidos en paginación',
          error.issues.map((issue) => ({
            field: String(issue.path),
            message: issue.message
          })))
      }
      handleControllerError(error, res)
    }
  }
