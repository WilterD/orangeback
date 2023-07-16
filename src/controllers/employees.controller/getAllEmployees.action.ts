import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'
import { Employee } from './types'

const getAllEmployees = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const employees = await executeGetAllEmployees({
      onlyForAgencyRif: req.query?.onlyForAgencyRif as string ?? null
    })
    return res.status(STATUS.OK).json(employees)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

async function executeGetAllEmployees (body: GetAllEmployeesOptions): Promise<Employee[]> {
  const whereValues = []
  let onlyForAgencyRifComplement = ''

  if (body.onlyForAgencyRif != null && body.onlyForAgencyRif !== '') {
    whereValues.push(body.onlyForAgencyRif)
    onlyForAgencyRifComplement += `
      WHERE
        agency_rif = $1
    `
  }

  const text = `
    SELECT 
      * 
    FROM 
      employees
    ${onlyForAgencyRifComplement}
    ORDER BY 
      name
  `

  const { rows } = await pool.query({ text, values: whereValues })
  return camelizeObject(rows) as unknown as Employee[]
}

interface GetAllEmployeesOptions {
  onlyForAgencyRif: string | null
}

export default getAllEmployees
