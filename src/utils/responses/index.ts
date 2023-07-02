import { Response } from 'express'

export interface SchemaError {
  field: string | number
  message: string
}

export const errorResponse = (
  res: Response,
  status: number,
  message: string,
  details?: SchemaError | SchemaError[]
): Response => {
  return res.status(status).json({
    message,
    details
  })
}

export const numberOfPages = (total: number, perPage: number): number => {
  if (total === 0 || perPage === 0) return 0

  return Math.ceil(total / perPage)
}

export interface PaginateSettings {
  total: number
  page: number
  perPage: number
}

export const paginatedItemsResponse = <T>(
  res: Response,
  status: number,
  items: T[],
  paginate: PaginateSettings
): Response => {
  const pages = numberOfPages(paginate.total, paginate.perPage)
  return res.status(status).json({
    paginate: {
      ...paginate,
      pages
    },
    items
  })
}
