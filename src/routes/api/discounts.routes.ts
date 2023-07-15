import { Router } from 'express'

import { getDiscounts} from '../../controllers/discounts.controller/get'
import { getDiscountById } from '../../controllers/discounts.controller/getById'
import { addDiscount } from '../../controllers/discounts.controller/add'
import { updateDiscount } from '../../controllers/discounts.controller/update'
import { deleteDiscount } from '../../controllers/discounts.controller/delete'
import { getDiscountByAgencyRif } from '../../controllers/discounts.controller/getDiscountsByAgency'


import { schemaGuard } from '../../middlewares/schemaGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { discountsSchema } from '../../schemas/discounts.schema'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), getDiscounts)
router.get('/:discountId', tokenGuard(), verifyToken(), getDiscountById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(discountsSchema), addDiscount)
router.put('/:discountId', tokenGuard(), verifyToken(), schemaGuard(discountsSchema), updateDiscount)
router.delete('/:discountId', tokenGuard(), verifyToken(), deleteDiscount)
router.get('/agency/:agencyRif', tokenGuard(), verifyToken(), getDiscountByAgencyRif)

export default router
