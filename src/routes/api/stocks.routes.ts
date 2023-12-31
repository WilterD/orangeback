import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import {
  createStockSchema,
  updateStockSchema
} from '../../schemas/stocks.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { getProductsPerAgencies } from '../../controllers/stocks.controller/get'
import { getProductPerAgencyById } from '../../controllers/stocks.controller/getById'
import { addProductPerAgency } from '../../controllers/stocks.controller/add'
import { updatedProductPerAgency } from '../../controllers/stocks.controller/update'
import { deleteProductPerAgency } from '../../controllers/stocks.controller/delete'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getProductsPerAgencies)
router.get('/product/:productId/agency/:agencyRif', tokenGuard(), verifyToken(), getProductPerAgencyById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(createStockSchema), addProductPerAgency)
router.put('/product/:productId/agency/:agencyRif', tokenGuard(), verifyToken(), schemaGuard(updateStockSchema), updatedProductPerAgency)
router.delete('/product/:productId/agency/:agencyRif', tokenGuard(), verifyToken(), deleteProductPerAgency)

export default router
