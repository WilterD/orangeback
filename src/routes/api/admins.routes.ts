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

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getAdmins)
router.get('/:adminId', getAdminById)
router.post('/', schemaGuard(adminsSchema), addAdmin)
router.put('/:adminId', schemaGuard(adminsSchema), updateAdmin)
router.delete('/:adminId', deleteAdmin)

export default router
