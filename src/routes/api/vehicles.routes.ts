import { Router } from 'express'
import {
  getVehicles,
  getVehicleById,
  addVehicle,
  updateVehicle,
  deleteVehicle
} from '../../controllers/vehicles.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createVehiclesSchema, updateVehiclesSchema } from '../../schemas/vehicles.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getVehicles)
router.get('/:licensePlate', tokenGuard(), verifyToken(), getVehicleById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(createVehiclesSchema), addVehicle)
router.put('/:licensePlate', tokenGuard(), verifyToken(), schemaGuard(updateVehiclesSchema), updateVehicle)
router.delete('/:licensePlate', tokenGuard(), verifyToken(), deleteVehicle)

export default router
