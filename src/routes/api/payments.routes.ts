import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createPaymentsSchema, updatePaymentsSchema } from '../../schemas/payments.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { getPayments } from '../../controllers/payments.controller/get'
import { getPaymentById } from '../../controllers/payments.controller/getById'
import { addPayment } from '../../controllers/payments.controller/add'
import { updatePayment } from '../../controllers/payments.controller/update'
import { deletePayment } from '../../controllers/payments.controller/delete'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getPayments)
router.get('/bill/:billId/payment/:paymentId', tokenGuard(), verifyToken(), getPaymentById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(createPaymentsSchema), addPayment)
router.put('/bill/:billId/payment/:paymentId', tokenGuard(), verifyToken(), schemaGuard(updatePaymentsSchema), updatePayment)
router.delete('/bill/:billId/payment/:paymentId', tokenGuard(), verifyToken(), deletePayment)

export default router
