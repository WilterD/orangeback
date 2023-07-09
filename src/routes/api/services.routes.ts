import { Router } from 'express'
import {
  getServices,
  getServiceById,
  addService,
  updateService,
  deleteService
} from '../../controllers/services.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { servicesSchema } from '../../schemas/services.schema'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getServices)
router.get('/:serviceId', tokenGuard(), verifyToken(), getServiceById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(servicesSchema), addService)
router.put('/:serviceId', tokenGuard(), verifyToken(), schemaGuard(servicesSchema), updateService)
router.delete('/:serviceId', tokenGuard(), verifyToken(), deleteService)

export default router
