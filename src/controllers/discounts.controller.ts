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

export const getDiscounts = async (
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
      text: 'SELECT COUNT(*) FROM discounts'
    })

    const response = await pool.query({
      text: 'SELECT * FROM discounts ORDER BY agency_rif, percentage LIMIT $1 OFFSET $2',
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

export const getDiscountById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM discounts WHERE discount_id = $1',
      values: [req.params.discountId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.discountId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const getDiscountByAgencyRif = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM discounts WHERE agency_rif = $1',
      values: [req.params.agencyRif]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.agencyRif}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getDiscountsDataFromRequestBody = (req: Request): any[] => {
  const {
    percentage,
    servicesMin,
    servicesMax,
    agencyRif
  } = req.body
  const newDiscount = [
    percentage,
    servicesMin,
    servicesMax,
    agencyRif
  ]
  return newDiscount
}

export const addDiscount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newDiscount = getDiscountsDataFromRequestBody(req)

    const insertar = await pool.query({
      text: 'INSERT INTO discounts (percentage, services_min, services_max, agency_rif) VALUES ($1, $2, $3, $4) RETURNING discount_id',
      values: newDiscount
    })
    const insertedId: string = insertar.rows[0].discount_id
    const response = await pool.query({
      text: 'SELECT * FROM discounts WHERE discount_id = $1',
      values: [insertedId]
    })
    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const updateDiscount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedDiscount = getDiscountsDataFromRequestBody(req)
    updatedDiscount.push(req.params.discountId)
    const response = await pool.query({
      text: 'UPDATE discounts SET percentage = $1, services_min = $2, services_max = $3, agency_rif = $4 WHERE discount_id = $5',
      values: updatedDiscount
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.discountId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }

    return res.status(STATUS.OK).json({ message: 'Descuento modificado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteDiscount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM discounts WHERE discount_id = $1',
      values: [req.params.discountId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.params.discountId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Descuento Eliminado exitosamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
