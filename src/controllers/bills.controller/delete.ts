import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { StatusError } from '../../utils/responses/status-error'

export const deleteBill = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await deleteBillById(Number(req.params.billId))
    return res.status(STATUS.OK).json({ message: 'Factura eliminada Correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

async function deleteBillById (billId: number): Promise<void> {
  const response = await pool.query({
    text: 'DELETE FROM bills WHERE bill_id = $1',
    values: [billId]
  })
  if (response.rowCount === 0) {
    throw new StatusError({
      message: `No se pudo encontrar el registro de id: ${billId}`,
      statusCode: STATUS.NOT_FOUND
    })
  }
}
