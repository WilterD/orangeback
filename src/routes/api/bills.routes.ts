import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createBillsSchema, updateBillsSchema } from '../../schemas/bills.schema'
// import { paginationGuard } from '../../middlewares/paginationGuard'
// import { tokenGuard } from '../../middlewares/tokenGuard'
// import { verifyToken } from '../../middlewares/auth'
import { getBills } from '../../controllers/bills.controller/get'
import { getBillById } from '../../controllers/bills.controller/getById'
import { addBill } from '../../controllers/bills.controller/add'
import { updateBill } from '../../controllers/bills.controller/update'
import { deleteBill } from '../../controllers/bills.controller/delete'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getBills)
router.get('/:billId', getBillById)
router.post('/', schemaGuard(createBillsSchema), addBill)
router.put('/:billId', schemaGuard(updateBillsSchema), updateBill)
router.delete('/:billId', deleteBill)

export default router
