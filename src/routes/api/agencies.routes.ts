import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createAgenciesSchema, updateAgenciesSchema } from '../../schemas/agencies.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { getAgencies } from '../../controllers/agencies.controller/get'
import { getAllAgencies } from '../../controllers/agencies.controller/getAll'
import { getAgencyById } from '../../controllers/agencies.controller/getById'
import { addAgency } from '../../controllers/agencies.controller/add'
import { updateAgency } from '../../controllers/agencies.controller/update'
import { deleteAgency } from '../../controllers/agencies.controller/delete'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getAgencies)
router.get('/all', tokenGuard(), verifyToken(), paginationGuard(), getAllAgencies)
router.get('/:agencyId', tokenGuard(), verifyToken(), getAgencyById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(createAgenciesSchema), addAgency)
router.put('/:agencyId', tokenGuard(), verifyToken(), schemaGuard(updateAgenciesSchema), updateAgency)
router.delete('/:agencyId', tokenGuard(), verifyToken(), deleteAgency)

export default router
