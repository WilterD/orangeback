/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express'
import { pool } from '../database'
import {
  // DEFAULT_PAGE,
  STATUS
} from '../utils/constants'
import {
  // PaginateSettings,
  // paginatedItemsResponse,
  // successItemsResponse,
  successResponse
} from '../utils/responses'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'

// export const getAdmins = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query

//   try {
//     let offset = (Number(page) - 1) * Number(size)

//     if (Number(page) < 1) {
//       offset = 0
//     }

//     const isEmpty = await pool.query({
//       text: 'SELECT * FROM admins'
//     })
//     if (isEmpty.rowCount === 0) {
//       throw new StatusError({
//         message: 'La tabla está vacía',
//         statusCode: STATUS.NOT_FOUND
//       })
//     }
//     const response = await pool.query({
//       text: 'SELECT * FROM admins ORDER BY admin_id LIMIT $1 OFFSET $2',
//       values: [size, offset]
//     })
//     const pagination: PaginateSettings = {
//       total: response.rowCount,
//       currentPage: Number(page),
//       perPage: Number(size)
//     }
//     return paginatedItemsResponse(res, STATUS.OK, response.rows, pagination)
//   } catch (error: unknown) {
//     return handleControllerError(error, res)
//   }
// }

export const getAdminById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM admins WHERE admin_id = $1',
      values: [req.params.adminId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.adminId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return successResponse(res, STATUS.OK, response.rows[0])
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

// const getAdminsDataFromRequestBody = (req: Request): any[] => {
//   const { name, email, password } = req.body
//   const newAdmin = [name, email, password]
//   return newAdmin
// }

// export const addAdmin = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const newAdmin = getAdminsDataFromRequestBody(req)

//     const insertar = await pool.query({
//       text: 'INSERT INTO admins (name, email, password) VALUES ($1, $2, $3) RETURNING admin_id',
//       values: newAdmin
//     })
//     const insertedId: string = insertar.rows[0].admin_id
//     const response = await pool.query({
//       text: `SELECT * FROM admins WHERE admin_id = ${insertedId}`
//     })
//     return successItemsResponse(res, STATUS.CREATED, response.rows[0])
//   } catch (error: unknown) {
//     return handleControllerError(error, res)
//   }
// }

// export const updateAdmin = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const updatedAdmin = getAdminsDataFromRequestBody(req)
//     updatedAdmin.push(req.params.adminId)
//     const response = await pool.query({
//       text: 'UPDATE admins SET name = $1, email = $2, password = $3 WHERE admin_id = $4',
//       values: updatedAdmin
//     })
//     console.log(response)
//     if (response.rowCount === 0) {
//       throw new StatusError({
//         message: `No se pudo encontrar el registro de id: ${req.params.adminId}`,
//         statusCode: STATUS.NOT_FOUND
//       })
//     }
//     return successResponse(res, STATUS.OK, 'Administrador modificado exitosamente')
//   } catch (error: unknown) {
//     console.log(error)
//     return handleControllerError(error, res)
//   }
// }

// export const deleteAdmin = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const response = await pool.query({
//       text: 'DELETE FROM admins WHERE admin_id = $1',
//       values: [req.params.adminId]
//     })
//     if (response.rowCount === 0) {
//       throw new StatusError({
//         message: `No se pudo encontrar el registro de id: ${req.params.adminId}`,
//         statusCode: STATUS.NOT_FOUND
//       })
//     }
//     return successResponse(res, STATUS.OK, 'Administrador eliminado')
//   } catch (error: unknown) {
//     return handleControllerError(error, res)
//   }
// }
