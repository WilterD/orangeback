import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import {
  createBillingActivitySchema,
  updateBillingActivitySchema
} from '../../schemas/billingActivities.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { getBillingActivities } from '../../controllers/billingActivities.controller/get'
import { getBillingActivityById } from '../../controllers/billingActivities.controller/getById'
import { addBillingActivity } from '../../controllers/billingActivities.controller/add'
import { updatedBillingActivity } from '../../controllers/billingActivities.controller/update'
import { deleteBillingActivity } from '../../controllers/billingActivities.controller/delete'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get(
  '/',
  tokenGuard(),
  verifyToken(),
  paginationGuard(),
  getBillingActivities
)
router.get(
  '/services/:serviceId/activities/:activityId/orders/:orderId',
  tokenGuard(),
  verifyToken(),
  getBillingActivityById
)
router.post(
  '/',
  tokenGuard(),
  verifyToken(),
  schemaGuard(createBillingActivitySchema),
  addBillingActivity
)
router.put(
  '/services/:serviceId/activities/:activityId/orders/:orderId',
  tokenGuard(),
  verifyToken(),
  schemaGuard(updateBillingActivitySchema),
  updatedBillingActivity
)
router.delete(
  '/services/:serviceId/services/:activityId/orders/:orderId',
  tokenGuard(),
  verifyToken(),
  deleteBillingActivity
)

export default router
