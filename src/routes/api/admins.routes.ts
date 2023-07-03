import { Router } from 'express'
import {
  getAdmins,
  getAdminById,
  addAdmin,
  updateAdmin,
  deleteAdmin
} from '../../controllers/admins.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { adminsSchema } from '../../schemas/admins.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getAdmins)
router.get('/:adminId', tokenGuard(), verifyToken(), getAdminById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(adminsSchema), addAdmin)
router.put('/:adminId', tokenGuard(), verifyToken(), schemaGuard(adminsSchema), updateAdmin)
router.delete('/:adminId', tokenGuard(), verifyToken(), deleteAdmin)

export default router
