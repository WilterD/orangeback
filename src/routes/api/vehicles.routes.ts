import { Router } from 'express'
import { getVehicles } from '../../controllers/vehicles.controller/get'
import { getVehicleById } from '../../controllers/vehicles.controller/getById'
import { addVehicle } from '../../controllers/vehicles.controller/add'
import { updateVehicle } from '../../controllers/vehicles.controller/update'
import { deleteVehicle } from '../../controllers/vehicles.controller/delete'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createVehiclesSchema, updateVehiclesSchema } from '../../schemas/vehicles.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { getVehicleByClient } from '../../controllers/vehicles.controller/getByClient'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getVehicles)
router.get('/client/:clientDni', tokenGuard(), verifyToken(), getVehicleByClient)
router.get('/:licensePlate', tokenGuard(), verifyToken(), getVehicleById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(createVehiclesSchema), addVehicle)
router.put('/:licensePlate', tokenGuard(), verifyToken(), schemaGuard(updateVehiclesSchema), updateVehicle)
router.delete('/:licensePlate', tokenGuard(), verifyToken(), deleteVehicle)

export default router
