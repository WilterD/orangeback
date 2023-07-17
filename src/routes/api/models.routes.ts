import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createModelsSchema, updateModelsSchema } from '../../schemas/models.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { getModels } from '../../controllers/models.controller/get'
import { getModelById } from '../../controllers/models.controller/getById'
import { addModel } from '../../controllers/models.controller/add'
import { updateModel } from '../../controllers/models.controller/update'
import { deleteModel } from '../../controllers/models.controller/delete'
import { getAllModels } from '../../controllers/models.controller/getAll'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/all', tokenGuard(), verifyToken(), paginationGuard(), getAllModels)
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getModels)
router.get('/:modelId', tokenGuard(), verifyToken(), getModelById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(createModelsSchema), addModel)
router.put('/:modelId', tokenGuard(), verifyToken(), schemaGuard(updateModelsSchema), updateModel)
router.delete('/:modelId', tokenGuard(), verifyToken(), deleteModel)

export default router
