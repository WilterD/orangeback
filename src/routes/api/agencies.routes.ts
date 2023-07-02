import { Router } from 'express'
import {
  getAgencies,
  getAgencyById,
  addAgency,
  updateAgency,
  deleteAgency
} from '../../controllers/agencies.controller'
import { schemaWard } from '../../middlewares/schemaWard'
import { agenciesSchema } from '../../schemas/agencies.schema'
import { agenciesupdateSchema } from '../../schemas/agenciesupdate.schema'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getAgencies)
router.get('/:agencyId', getAgencyById)
router.post('/', schemaWard(agenciesSchema), addAgency)
router.put('/:agencyId', schemaWard(agenciesupdateSchema), updateAgency)
router.delete('/:agencyId', deleteAgency)

export default router
