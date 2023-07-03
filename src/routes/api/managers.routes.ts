import { Router } from 'express'
import {
  getManagers,
  getManagerById,
  addManager,
  updateManager,
  deleteManager
} from '../../controllers/managers.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createManagersSchema, updateManagersSchema } from '../../schemas/managers.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getManagers)
router.get('/:managerId', tokenGuard(), verifyToken(), getManagerById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(createManagersSchema), addManager)
router.put('/:managerId', tokenGuard(), verifyToken(), schemaGuard(updateManagersSchema), updateManager)
router.delete('/:managerId', tokenGuard(), verifyToken(), deleteManager)

export default router
