import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createbillingProductsSchema, updatebillingProductsSchema } from '../../schemas/billingProducts.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { getBillingProducts } from '../../controllers/billingProducts.controller/get'
import { getAllBillingProducts } from '../../controllers/billingProducts.controller/getAll'
import { getBillingProductById } from '../../controllers/billingProducts.controller/getById'
import { addBillingProduct } from '../../controllers/billingProducts.controller/add'
import { updateBillingProduct } from '../../controllers/billingProducts.controller/update'
import { deleteBillingProduct } from '../../controllers/billingProducts.controller/delete'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getBillingProducts)
router.get('/all', tokenGuard(), verifyToken(), paginationGuard(), getAllBillingProducts)
router.get('/services/:serviceId/services/:activityId/orders/:orderId/products/:productId', tokenGuard(), verifyToken(), getBillingProductById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(createbillingProductsSchema), addBillingProduct)
router.put('/services/:serviceId/services/:activityId/orders/:orderId/products/:productId', tokenGuard(), verifyToken(), schemaGuard(updatebillingProductsSchema), updateBillingProduct)
router.delete('/services/:serviceId/services/:activityId/orders/:orderId/products/:productId', tokenGuard(), verifyToken(), deleteBillingProduct)

export default router
