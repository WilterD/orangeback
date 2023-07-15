import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getStatesDataFromRequestBody = (req: Request): any[] => {
  const { name } = req.body
  const newState = [name]
  return newState
}

export const updateState = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedState = getStatesDataFromRequestBody(req)
    updatedState.push(req.params.stateId)
    const response = await pool.query({
      text: `UPDATE states 
              SET name = $1 
              WHERE state_id = $2`,
      values: updatedState
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.stateId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Estado Modificado Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
