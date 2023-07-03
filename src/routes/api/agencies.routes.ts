import { Router } from 'express'
import {
  getAgencies,
  getAgencyById,
  addAgency,
  updateAgency,
  deleteAgency
} from '../../controllers/agencies.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createAgenciesSchema, updateAgenciesSchema } from '../../schemas/agencies.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getAgencies)
router.get('/:agencyId', tokenGuard(), verifyToken(), getAgencyById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(createAgenciesSchema), addAgency)
router.put('/:agencyId', tokenGuard(), verifyToken(), schemaGuard(updateAgenciesSchema), updateAgency)
router.delete('/:agencyId', tokenGuard(), verifyToken(), deleteAgency)

export default router
