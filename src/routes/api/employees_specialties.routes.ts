import { Router } from 'express'
import {
  getE_Specialties,
  getE_SpecialtiesById,
  addE_Specialties,
  deleteE_Specialties
} from '../../controllers/e_specialties.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { E_SpecialtySchema } from '../../schemas/E_Specialties.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */

router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getE_Specialties)
router.get('/:e_spcialtyId/:service_id', tokenGuard(), verifyToken(), getE_SpecialtiesById)
router.post('/', schemaGuard(E_SpecialtySchema), tokenGuard(), verifyToken(), addE_Specialties)
router.delete('/:e_spcialtyId/:service_id', tokenGuard(), verifyToken(), deleteE_Specialties)

export default router