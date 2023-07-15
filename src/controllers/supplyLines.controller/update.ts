import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

const getSupplyLinesDataFromRequestBody = (req: Request): any[] => {
  const { name } = req.body
  const newSupplyLine = [name]
  return newSupplyLine
}

export const updateSupplyLine = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedState = getSupplyLinesDataFromRequestBody(req)
    updatedState.push(req.params.supplyLineId)
    const response = await pool.query({
      text: 'UPDATE supply_lines SET name = $1 WHERE supply_line_id = $2',
      values: updatedState
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.supplyLineId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Línea de Producción Modificada Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
