import { Router } from 'express'
import {
  getModels,
  getModelsById,
  addModel,
  updateModel,
  deleteModel
} from '../../controllers/models.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createModelsSchema, updateModelsSchema } from '../../schemas/models.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getModels)
router.get('/:modelId', tokenGuard(), verifyToken(), getModelsById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(createModelsSchema), addModel)
router.put('/:modelId', tokenGuard(), verifyToken(), schemaGuard(updateModelsSchema), updateModel)
router.delete('/:modelId', tokenGuard(), verifyToken(), deleteModel)

export default router
