import express from 'express'

import loginRouter from './api/login.routes'
import adminsRouter from './api/admins.routes'
import statesRouter from './api/states.routes'

const router = express.Router()

router.use('/login', loginRouter)
router.use('/admins', adminsRouter)
router.use('/states', statesRouter)

export default router

// ejemplo master
