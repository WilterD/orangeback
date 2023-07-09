import { Request, Response } from 'express'
import { pool } from '../database'
import { DEFAULT_PAGE, STATUS } from '../utils/constants'
import {
  PaginateSettings,
  paginatedItemsResponse
} from '../utils/responses'
import { StatusError } from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'
import camelizeObject from '../utils/camelizeObject'

export const getBills = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query

  try {
    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const { rows } = await pool.query({
      text: 'SELECT COUNT(*) FROM bills'
    })

    const response = await pool.query({
      text: 'SELECT * FROM bills ORDER BY bill_id LIMIT $1 OFFSET $2',
      values: [size, offset]
    })
    const pagination: PaginateSettings = {
      total: Number(rows[0].count),
      page: Number(page),
      perPage: Number(size)
    }
    return paginatedItemsResponse(res, STATUS.OK, camelizeObject(response.rows) as any, pagination)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const getBillById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM bills WHERE bill_id = $1',
      values: [req.params.billId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de: ${req.params.billId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getBillsCreateDataFromRequestBody = (req: Request): any[] => {
  const {
    bill_date,
    discount_value,
    total_cost,
    order_id
  } = req.body
  const newBill = [
    bill_date,
    discount_value,
    total_cost,
    order_id
  ]
  return newBill
}

export const addBill = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newBill = getBillsCreateDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO bills (bill_date,discount_value,total_cost,order_id) VALUES ($1,$2,$3,$4) RETURNING bill_id',
      values: newBill
    })
    const insertedId: string = insertar.rows[0].bill_id
    const response = await pool.query({
      text: 'SELECT * FROM bills WHERE bill_id = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getBillsUpdateDataFromRequestBody = (req: Request): any[] => {
  const {
    bill_date,
    discount_value,
    total_cost,
    order_id
  } = req.body

  const updatedBill = [
    bill_date,
    discount_value,
    total_cost,
    order_id
  ]
  return updatedBill
}

export const updateBill = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedBill = getBillsUpdateDataFromRequestBody(req)
    updatedBill.push(req.params.billId)
    const response = await pool.query({
      text: 'UPDATE bills SET bill_date = $1, discount_value = $2, total_cost = $3, order_id = $4 WHERE bill_id = $5',
      values: updatedBill
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.billId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Factura Modificada Exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteBill = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM bills WHERE bill_id = $1',
      values: [req.params.billId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.billId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Factura eliminada Correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
