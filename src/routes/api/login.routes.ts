import { Router } from 'express'
import { signIn } from '../../controllers/login.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { loginSchema } from '../../schemas/login.schema'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.post('/', tokenGuard(), verifyToken(), schemaGuard(loginSchema), signIn)

export default router
