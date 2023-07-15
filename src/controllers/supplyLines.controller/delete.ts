import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

export const deleteSupplyLine = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM supply_lines WHERE supply_line_id = $1',
      values: [req.params.supplyLineId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.supplyLineId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Línea de Producción Eliminada Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
