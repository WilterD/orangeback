import { Router } from 'express'
import {
  getBills,
  getBillById,
  addBill,
  updateBill,
  deleteBill
} from '../../controllers/bills.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createBillsSchema, updateBillsSchema } from '../../schemas/bills.schema'
// import { paginationGuard } from '../../middlewares/paginationGuard'
// import { tokenGuard } from '../../middlewares/tokenGuard'
// import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getBills)
router.get('/:billId', getBillById)
router.post('/', schemaGuard(createBillsSchema), addBill)
router.put('/:billId', schemaGuard(updateBillsSchema), updateBill)
router.delete('/:billId', deleteBill)

export default router
