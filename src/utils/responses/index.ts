import { Response } from 'express'

export const errorResponse = (
  res: Response,
  status: number,
  message: string
): Response => {
  return res.status(status).json({
    success: false,
    message
  })
}

export const successResponse = <T>(
  res: Response,
  status: number,
  item: T
): Response => {
  return res.status(status).json({
    success: true,
    item
  })
}

export const successItemsResponse = <T>(
  res: Response,
  status: number,
  items: T[]
): Response => {
  return res.status(status).json({
    success: true,
    items
  })
}

export const paginatedItemsResponse = <T>(
  res: Response,
  status: number,
  items: T[],
  paginate: PaginateSettings
): Response => {
  const pages = numberOfPages(paginate.total, paginate.perPage)
  return res.status(status).json({
    success: true,
    paginate: {
      ...paginate,
      pages
    },
    items
  })
}

export const numberOfPages = (total: number, perPage: number): number => {
  if (total === 0 || perPage === 0) return 0

  return Math.ceil(total / perPage)
}

export interface PaginateSettings {
  total: number
  currentPage: number
  perPage: number
}
