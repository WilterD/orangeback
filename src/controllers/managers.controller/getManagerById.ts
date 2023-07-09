import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { StatusError } from '../../utils/responses/status-error'
import { Manager } from './types'
import camelizeObject from '../../utils/camelizeObject'

export const getById = async (managerDni: string): Promise<Manager> => {
  const response = await pool.query({
    text: 'SELECT * FROM managers WHERE manager_dni = $1',
    values: [managerDni]
  })

  if (response.rowCount === 0) {
    throw new StatusError({
      message: `No se pudo encontrar el registro de id: ${managerDni}`,
      statusCode: STATUS.NOT_FOUND
    })
  }

  return camelizeObject(response.rows[0]) as unknown as Manager
}

export default getById
