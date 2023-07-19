import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import {
  createbillingProductsSchema,
  updatebillingProductsSchema
} from '../../schemas/billingProducts.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { getBillingProducts } from '../../controllers/billingProducts.controller/get'
import { getBillingProductById } from '../../controllers/billingProducts.controller/getById'
import { addBillingProduct } from '../../controllers/billingProducts.controller/add'
import { updateBillingProduct } from '../../controllers/billingProducts.controller/update'
import { deleteBillingProduct } from '../../controllers/billingProducts.controller/delete'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get(
  '/',
  tokenGuard(),
  verifyToken(),
  paginationGuard(),
  getBillingProducts
)
router.get(
  '/service/:serviceId/activity/:activityId/order/:orderId/product/:productId',
  tokenGuard(),
  verifyToken(),
  getBillingProductById
)
router.post(
  '/',
  tokenGuard(),
  verifyToken(),
  schemaGuard(createbillingProductsSchema),
  addBillingProduct
)
router.put(
  '/service/:serviceId/activity/:activityId/order/:orderId/product/:productId',
  tokenGuard(),
  verifyToken(),
  schemaGuard(updatebillingProductsSchema),
  updateBillingProduct
)
router.delete(
  '/service/:serviceId/activity/:activityId/order/:orderId/product/:productId',
  tokenGuard(),
  verifyToken(),
  deleteBillingProduct
)

export default router
