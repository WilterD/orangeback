import { Router } from 'express'
import { getStates } from '../../controllers/states.controller/get'
import { getAllStates } from '../../controllers/states.controller/getAll'
import { getStateById } from '../../controllers/states.controller/getById'
import { addState } from '../../controllers/states.controller/add'
import { updateState } from '../../controllers/states.controller/update'
import { deleteState } from '../../controllers/states.controller/delete'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { statesSchema } from '../../schemas/states.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/all', tokenGuard(), verifyToken(), paginationGuard(), getAllStates)
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getStates)
router.get('/:stateId', tokenGuard(), verifyToken(), getStateById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(statesSchema), addState)
router.put('/:stateId', tokenGuard(), verifyToken(), schemaGuard(statesSchema), updateState)
router.delete('/:stateId', tokenGuard(), verifyToken(), deleteState)

export default router
