import { Router } from 'express'
import {
  getDiscounts,
  getDiscountById,
  getDiscountByAgencyRif,
  addDiscount,
  updateDiscount,
  deleteDiscount
} from '../../controllers/discounts.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { discountsSchema } from '../../schemas/discounts.schema'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), getDiscounts)
router.get('/:discountId', tokenGuard(), verifyToken(), getDiscountById)
router.get('/agency/:agencyRif', tokenGuard(), verifyToken(), getDiscountByAgencyRif)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(discountsSchema), addDiscount)
router.put('/:discountId', tokenGuard(), verifyToken(), schemaGuard(discountsSchema), updateDiscount)
router.delete('/:discountId', tokenGuard(), verifyToken(), deleteDiscount)

export default router
