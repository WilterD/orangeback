import { Router } from 'express'
import { signIn } from '../../controllers/login.controller'
import { schemaWard } from '../../middlewares/schemaWard'
import { loginSchema } from '../../schemas/login.schema'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.post('/', schemaWard(loginSchema), signIn)

export default router
