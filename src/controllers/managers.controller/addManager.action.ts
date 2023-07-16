import { Request, Response } from 'express'
import { pool } from '../../database'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import camelizeObject from '../../utils/camelizeObject'

const getManagersCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    managerDni,
    name,
    mainPhone,
    secondaryPhone,
    address,
    email
  } = req.body
  const newManager = [
    managerDni,
    name,
    mainPhone,
    secondaryPhone,
    address,
    email
  ]
  return newManager
}

export const addManager = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newManager = getManagersCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO managers (manager_dni, name, main_phone, secondary_phone, address, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING manager_dni',
      values: newManager
    })
    const insertedId: string = insertar.rows[0].manager_dni
    const response = await pool.query({
      text: 'SELECT * FROM managers WHERE manager_dni = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export default addManager
