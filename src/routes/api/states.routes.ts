import { Router } from 'express'
import {
  getStates,
  getStateById,
  addState,
  updateState,
  deleteState
} from '../../controllers/states.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { statesSchema } from '../../schemas/states.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', paginationGuard(), getStates)
router.get('/:stateId', getStateById)
router.post('/', schemaGuard(statesSchema), addState)
router.put('/:stateId', schemaGuard(statesSchema), updateState)
router.delete('/:stateId', deleteState)

export default router
