import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { Manager } from './types'

const getAllManagers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const managers = executeGetAllManagers({
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      onlyAvailable: !!req.query?.onlyAvailable,
      includeManager: req.query?.includeManager as string ?? null
    })
    return res.status(STATUS.OK).json(managers)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

async function executeGetAllManagers (body: GetAllManagersOptions): Promise<Manager[]> {
  const whereValues = []
  let text = 'SELECT * FROM managers ORDER BY name'

  if (body.onlyAvailable) {
    let includeManagerComplement = ''
    if (body.includeManager != null && body.includeManager !== '') {
      whereValues.push(body.includeManager)
      includeManagerComplement += 'OR manager_dni = $1'
    }

    text = `
    SELECT * FROM managers
    WHERE
      manager_dni NOT IN(
        SELECT DISTINCT manager_dni FROM agencies WHERE
        manager_dni IS NOT NULL
      ) ${includeManagerComplement} 
    ORDER BY name`
  }

  const { rows } = await pool.query({ text, values: whereValues })
  return camelizeObject(rows) as unknown as Manager[]
}

interface GetAllManagersOptions {
  onlyAvailable: boolean
  includeManager: string | null
}

export default getAllManagers
