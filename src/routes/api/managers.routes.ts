import { Router } from 'express'
import {
  getManagers,
  getManagerById,
  addManager,
  updateManager,
  deleteManager
} from '../../controllers/managers.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { managersSchema } from '../../schemas/managers.schema'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getManagers)
router.get('/:managerId', getManagerById)
router.post('/', schemaGuard(managersSchema), addManager)
router.put('/:managerId', schemaGuard(managersSchema), updateManager)
router.delete('/:managerId', deleteManager)

export default router
