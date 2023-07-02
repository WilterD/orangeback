import { Router } from 'express'
import {
  getManagers,
  getManagerById,
  addManager,
  updateManager,
  deleteManager
} from '../../controllers/managers.controller'
import { schemaWard } from '../../middlewares/schemaWard'
import { managersSchema } from '../../schemas/managers.schema'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getManagers)
router.get('/:managerId', getManagerById)
router.post('/', schemaWard(managersSchema), addManager)
router.put('/:managerId', schemaWard(managersSchema), updateManager)
router.delete('/:managerId', deleteManager)

export default router
