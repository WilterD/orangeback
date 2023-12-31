import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { ordersSchema, updateOrdersSchema } from '../../schemas/orders.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import getOrders from '../../controllers/orders.controller/getOrders.action'
import getOrderById from '../../controllers/orders.controller/getOrderById.action'
import addOrder from '../../controllers/orders.controller/addOrder.action'
import updateOrder from '../../controllers/orders.controller/updateOrder.action'
import deleteOrder from '../../controllers/orders.controller/deleteOrder.action'
import getAllOrders from '../../controllers/orders.controller/getAllOrders.action'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getOrders)
router.get('/all', tokenGuard(), verifyToken(), getAllOrders)
router.get('/:orderId', tokenGuard(), verifyToken(), getOrderById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(ordersSchema), addOrder)
router.put('/:orderId', tokenGuard(), verifyToken(), schemaGuard(updateOrdersSchema), updateOrder)
router.delete('/:orderId', tokenGuard(), verifyToken(), deleteOrder)

export default router
