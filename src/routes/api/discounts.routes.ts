import { Router } from 'express'
import {
  getDiscounts,
  getDiscountById,
  addDiscount,
  updateDiscount,
  deleteDiscount
} from '../../controllers/discounts.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { discountsSchema } from '../../schemas/discounts.schema'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getDiscounts)
router.get('/:discountId', getDiscountById)
router.post('/', schemaGuard(discountsSchema), addDiscount)
router.put('/:discountId', schemaGuard(discountsSchema), updateDiscount)
router.delete('/:discountId', deleteDiscount)

export default router
