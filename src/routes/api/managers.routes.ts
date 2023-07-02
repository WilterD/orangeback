import { Router } from 'express'
import {
  getManagers,
  getManagerById,
  addManager,
  updateManager,
  deleteManager
} from '../../controllers/managers.controller'

import { schemaWard } from '../../middlewares/schemaWard'
import { createManagersSchema } from '../../schemas/createmanager.schema'
import { updateManagersSchema } from '../../schemas/updatemanager.schema'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getManagers)
router.get('/:managerId', getManagerById)
router.post('/', schemaWard(createManagersSchema), addManager)
router.put('/:managerId', schemaWard(updateManagersSchema), updateManager)
router.delete('/:managerId', deleteManager)

export default router
