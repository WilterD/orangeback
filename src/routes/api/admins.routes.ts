import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { adminsSchema } from '../../schemas/admins.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { getAdmins } from '../../controllers/admins.controller/get'
import { getAdminById } from '../../controllers/admins.controller/getById'
import { addAdmin } from '../../controllers/admins.controller/add'
import { updateAdmin } from '../../controllers/admins.controller/update'
import { deleteAdmin } from '../../controllers/admins.controller/delete'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getAdmins)
router.get('/:adminId', tokenGuard(), verifyToken(), getAdminById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(adminsSchema), addAdmin)
router.put('/:adminId', tokenGuard(), verifyToken(), schemaGuard(adminsSchema), updateAdmin)
router.delete('/:adminId', tokenGuard(), verifyToken(), deleteAdmin)

export default router
