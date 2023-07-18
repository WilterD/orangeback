import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createCardBanksSchema, updateCardBanksSchema } from '../../schemas/cardBanks.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { getCardBanks } from '../../controllers/cardBanks.controller/get'
import { getCardBankById } from '../../controllers/cardBanks.controller/getById'
import { addCardBank } from '../../controllers/cardBanks.controller/add'
import { updateCardBank } from '../../controllers/cardBanks.controller/update'
import { deleteCardBank } from '../../controllers/cardBanks.controller/delete'
import { getAllCardBanks } from '../../controllers/cardBanks.controller/getAll'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/all', tokenGuard(), verifyToken(), paginationGuard(), getAllCardBanks)
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getCardBanks)
router.get('/:cardbankId', tokenGuard(), verifyToken(), getCardBankById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(createCardBanksSchema), addCardBank)
router.put('/:cardbankId', tokenGuard(), verifyToken(), schemaGuard(updateCardBanksSchema), updateCardBank)
router.delete('/:cardbankId', tokenGuard(), verifyToken(), deleteCardBank)

export default router
