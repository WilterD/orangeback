import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { servicesSchema } from '../../schemas/services.schema'

import { getServices } from '../../controllers/services.controller/get'
import { getById } from '../../controllers/services.controller/getById'
import { addService } from '../../controllers/services.controller/add'
import { updateService } from '../../controllers/services.controller/update'
import { deleteService } from '../../controllers/services.controller/delete'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getServices)
router.get('/:serviceId', tokenGuard(), verifyToken(), getById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(servicesSchema), addService)
router.put('/:serviceId', tokenGuard(), verifyToken(), schemaGuard(servicesSchema), updateService)
router.delete('/:serviceId', tokenGuard(), verifyToken(), deleteService)

export default router
