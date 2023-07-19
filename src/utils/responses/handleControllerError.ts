import { Response } from 'express'
import { StatusError } from './status-error'
import { errorResponse } from '.'
import { STATUS } from '../constants'

export const handleControllerError = (error: any, res: Response): Response => {
  console.log('HANDLE ERROR', error)
  if (error instanceof StatusError) {
    return errorResponse(res, error.getStatus(), error.message)
  }
  if (error.detail !== undefined) { return errorResponse(res, STATUS.INTERNAL_SERVER_ERROR, error.detail) }
  return errorResponse(res, STATUS.INTERNAL_SERVER_ERROR, error)
}
