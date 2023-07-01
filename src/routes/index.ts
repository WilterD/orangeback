import express from 'express'

import adminsRouter from './api/admins.routes'
import statesRouter from './api/states.routes'

const router = express.Router()

router.use('/admins', adminsRouter)
router.use('/states', statesRouter)

export default router

// ejemplo master
