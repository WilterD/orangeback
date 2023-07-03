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

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', paginationGuard(), getAgencies)
router.get('/:agencyId', getAgencyById)
router.post('/', schemaGuard(createAgenciesSchema), addAgency)
router.put('/:agencyId', schemaGuard(updateAgenciesSchema), updateAgency)
router.delete('/:agencyId', deleteAgency)

export default router
