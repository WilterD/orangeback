import { Router } from 'express'
import {
  getServicesPerModels,
  getServicePerModelById,
  addServicePerModel,   
  updateServicePerModel,
  deleteServicePerModel
} from '../../controllers/services_per_models.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createServicesPerModelsSchema, updateServicesPerModelsSchema } from '../../schemas/services_per_models.Schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
// import { tokenGuard } from '../../middlewares/tokenGuard'
// import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', paginationGuard(), getServicesPerModels)
router.get('/:ServicePerModelId/:ServicePerModelId2', getServicePerModelById)
router.post('/', schemaGuard(createServicesPerModelsSchema), addServicePerModel)
router.put('/:ServicePerModelId/:ServicePerModelId2', schemaGuard(updateServicesPerModelsSchema), updateServicePerModel)
router.delete('/:ServicePerModelId/:ServicePerModelId2', deleteServicePerModel)

export default router
