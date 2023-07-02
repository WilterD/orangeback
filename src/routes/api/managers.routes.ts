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

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getManagers)
router.get('/:managerId', getManagerById)
router.post('/', schemaGuard(createManagersSchema), addManager)
router.put('/:managerId', schemaGuard(updateManagersSchema), updateManager)
router.delete('/:managerId', deleteManager)

export default router
