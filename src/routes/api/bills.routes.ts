import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { billsSchema } from '../../schemas/bills.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { getAllBills } from '../../controllers/bills.controller/getAll'
import { getBills } from '../../controllers/bills.controller/get'
import { getBillById } from '../../controllers/bills.controller/getById'
import { addBill } from '../../controllers/bills.controller/add'
import { deleteBill } from '../../controllers/bills.controller/delete'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/all', tokenGuard(), verifyToken(), getAllBills)
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getBills)
router.get('/:billId', tokenGuard(), verifyToken(), getBillById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(billsSchema), addBill)
router.delete('/:billId', tokenGuard(), verifyToken(), deleteBill)

export default router
