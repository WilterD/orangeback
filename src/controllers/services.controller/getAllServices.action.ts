import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { ServicePaginated } from './types'

const getAllServices = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try {
    const items = await executeGetAllServices()
    return res.status(STATUS.OK).json(items)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

async function executeGetAllServices (): Promise<ServicePaginated[]> {
  const text = `
    SELECT
      s.service_id,
      s.description,
      SUM(a.cost_hour) AS total_cost,
      s.created_at
    FROM services AS s, activities AS a
    WHERE s.service_id = a.service_id
    GROUP BY
      s.service_id,
      s.description,
      s.created_at
    ORDER BY description`

  const { rows } = await pool.query({ text })
  return camelizeObject(rows) as unknown as ServicePaginated[]
}

export default getAllServices
