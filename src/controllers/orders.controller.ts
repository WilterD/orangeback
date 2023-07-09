// import { Request, Response } from 'express'
// import { pool } from '../database'
// import { DEFAULT_PAGE, STATUS } from '../utils/constants'
// import { PaginateSettings, paginatedItemsResponse } from '../utils/responses'
// import { StatusError } from '../utils/responses/status-error'
// import { handleControllerError } from '../utils/responses/handleControllerError'
// import _ from 'lodash'

// export const getOrders = async (
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
//       text: 'SELECT * FROM orders'
//     })
//     if (isEmpty.rowCount === 0) {
//       return res.status(STATUS.OK).json([])
//     }
//     const response = await pool.query({
//       text: 'SELECT * FROM orders ORDER BY order_id LIMIT $1 OFFSET $2',
//       values: [size, offset]
//     })
//     const pagination: PaginateSettings = {
//       total: response.rowCount,
//       page: Number(page),
//       perPage: Number(size)
//     }
//     const camelizatedObjectArray = _.map(response.rows, (item) => {
//       return _.mapKeys(item, (_value, key) => {
//         return _.camelCase(key)
//       })
//     })
//     return paginatedItemsResponse(
//       res,
//       STATUS.OK,
//       camelizatedObjectArray,
//       pagination
//     )
//   } catch (error: unknown) {
//     return handleControllerError(error, res)
//   }
// }

// export const getOrderById = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const response = await pool.query({
//       text: 'SELECT * FROM orders WHERE order_id = $1',
//       values: [req.params.orderId]
//     })
//     if (response.rowCount === 0) {
//       throw new StatusError({
//         message: `No se pudo encontrar el registro de: ${req.params.orderId}`,
//         statusCode: STATUS.NOT_FOUND
//       })
//     }
//     const camelizatedObject = _.mapKeys(response.rows[0], (_value, key) => {
//       return _.camelCase(key)
//     })
//     return res.status(STATUS.OK).json(camelizatedObject)
//   } catch (error: unknown) {
//     return handleControllerError(error, res)
//   }
// }

// const getOrdersCreateDataFromRequestBody = (req: Request): any[] => {
//   const {
//     responsible_dni,
//     responsible_name,
//     entry_time,
//     estimated_departure,
//     real_departure,
//     booking_id,
//     employee_dni
//   } = req.body
//   const newOrder = [
//     responsible_dni,
//     responsible_name,
//     entry_time,
//     estimated_departure,
//     real_departure,
//     booking_id,
//     employee_dni
//   ]
//   return newOrder
// }

// export const addOrder = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const newOrder = getOrdersCreateDataFromRequestBody(req)

//     const insertar = await pool.query({
//       text: 'INSERT INTO orders (responsible_dni,responsible_name,entry_time,estimated_departure,real_departure,booking_id,     employee_dni) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING order_id',
//       values: newOrder
//     })
//     const insertedId: string = insertar.rows[0].order_id
//     const response = await pool.query({
//       text: 'SELECT * FROM orders WHERE order_id = $1',
//       values: [insertedId]
//     })
//     const camelizatedObject = _.mapKeys(response.rows[0], (_value, key) => {
//       return _.camelCase(key)
//     })
//     return res.status(STATUS.CREATED).json(camelizatedObject)
//   } catch (error: unknown) {
//     return handleControllerError(error, res)
//   }
// }

// const getOrdersUpdateDataFromRequestBody = (req: Request): any[] => {
//   const {
//     responsible_dni,
//     responsible_name,
//     entry_time,
//     estimated_departure,
//     real_departure,
//     booking_id,
//     employee_dni
//   } = req.body

//   const updatedOrder = [
//     responsible_dni,
//     responsible_name,
//     entry_time,
//     estimated_departure,
//     real_departure,
//     booking_id,
//     employee_dni
//   ]
//   return updatedOrder
// }

// export const updateOrder = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const updatedOrder = getOrdersUpdateDataFromRequestBody(req)
//     updatedOrder.push(req.params.orderId)
//     const response = await pool.query({
//       text: 'UPDATE orders SET business_name = $1, manager_dni = $2, city_id = $3 WHERE order_id = $4',
//       values: updatedOrder
//     })
//     if (response.rowCount === 0) {
//       throw new StatusError({
//         message: `No se pudo encontrar el registro de id: ${req.params.orderId}`,
//         statusCode: STATUS.NOT_FOUND
//       })
//     }
//     return res
//       .status(STATUS.OK)
//       .json({ message: 'Agencia Modificada Exitosamente' })
//   } catch (error: unknown) {
//     return handleControllerError(error, res)
//   }
// }

// export const deleteOrder = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const response = await pool.query({
//       text: 'DELETE FROM orders WHERE order_id = $1',
//       values: [req.params.orderId]
//     })
//     if (response.rowCount === 0) {
//       throw new StatusError({
//         message: `No se pudo encontrar el registro de id: ${req.params.orderId}`,
//         statusCode: STATUS.NOT_FOUND
//       })
//     }
//     return res.status(STATUS.OK).json({ message: 'Orden Eliminada Exitosamente' })
//   } catch (error: unknown) {
//     return handleControllerError(error, res)
//   }
// }
