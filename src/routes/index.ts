import express from 'express'

import adminsRouter from './api/admins.routes'
import statesRouter from './api/states.routes'
import managersRouter from './api/managers.routes'
import agenciesRouter from './api/agencies.routes'

const router = express.Router()

router.use('/admins', adminsRouter)
router.use('/states', statesRouter)
router.use('/managers', managersRouter)
router.use('/agencies', agenciesRouter)

export default router
