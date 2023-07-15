import { Router } from 'express'
import { getSupplyLines } from '../../controllers/supplyLines.controller/get'
import { getSupplyLineById } from '../../controllers/supplyLines.controller/getById'
import { addSupplyLine } from '../../controllers/supplyLines.controller/add'
import { updateSupplyLine } from '../../controllers/supplyLines.controller/update'
import { deleteSupplyLine } from '../../controllers/supplyLines.controller/delete'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { supplyLinesSchema } from '../../schemas/supplyLines.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getSupplyLines)
router.get('/:supplyLineId', tokenGuard(), verifyToken(), getSupplyLineById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(supplyLinesSchema), addSupplyLine)
router.put('/:supplyLineId', tokenGuard(), verifyToken(), schemaGuard(supplyLinesSchema), updateSupplyLine)
router.delete('/:supplyLineId', tokenGuard(), verifyToken(), deleteSupplyLine)

export default router
