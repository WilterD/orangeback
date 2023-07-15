import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createManagersSchema, updateManagersSchema } from '../../schemas/managers.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import getManagers from '../../controllers/managers.controller/getManagers.action'
import getById from '../../controllers/managers.controller/getById.action'
import addManager from '../../controllers/managers.controller/addManager.action'
import updateManager from '../../controllers/managers.controller/updateManager.action'
import deleteManager from '../../controllers/managers.controller/deleteManager.action'
import getAllManagers from '../../controllers/managers.controller/getAllManagers.action'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/all', tokenGuard(), verifyToken(), paginationGuard(), getAllManagers)
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getManagers)
router.get('/:managerDni', tokenGuard(), verifyToken(), getById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(createManagersSchema), addManager)
router.put('/:managerDni', tokenGuard(), verifyToken(), schemaGuard(updateManagersSchema), updateManager)
router.delete('/:managerDni', tokenGuard(), verifyToken(), deleteManager)

export default router
