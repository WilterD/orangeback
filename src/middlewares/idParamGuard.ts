import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { errorResponse } from '../utils/responses'
import { STATUS } from '../utils/constants'
import { handleControllerError } from '../utils/responses/handleControllerError'

const schema = z.object({
  id: z.string().regex(/^\d+$/, "El parámetro 'id' debe ser un número")
})

export const idParamGuard =
  () => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params)
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
