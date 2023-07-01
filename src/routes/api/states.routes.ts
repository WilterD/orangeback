import { Router } from 'express'
import {
  getStates,
  getStateById,
  addState,
  updateState,
  deleteState
} from '../../controllers/states.controller'
import { schemaWard } from '../../middlewares/schemaWard'
import { statesSchema } from '../../schemas/states.schema'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getStates)
router.get('/:stateId', getStateById)
router.post('/', schemaWard(statesSchema), addState)
router.put('/:stateId', schemaWard(statesSchema), updateState)
router.delete('/:stateId', deleteState)

export default router
