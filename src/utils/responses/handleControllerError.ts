import { Response } from 'express'
import { StatusError } from './status-error'
import { errorResponse } from '.'
import { STATUS } from '../constants'

export const handleControllerError = (error: unknown, res: Response): Response => {
  if (error instanceof StatusError) {
    return errorResponse(res, error.getStatus(), error.message)
  }
  return errorResponse(res, STATUS.INTERNAL_SERVER_ERROR.code, STATUS.INTERNAL_SERVER_ERROR.msg)
}
