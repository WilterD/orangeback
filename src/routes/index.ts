import express from 'express'

import adminsRouter from './api/admins.routes'
import statesRouter from './api/states.routes'
import managersRouter from './api/managers.routes'
import jobsRouter from './api/jobs.routes'

const router = express.Router()

router.use('/admins', adminsRouter)
router.use('/states', statesRouter)
router.use('/managers', managersRouter)
router.use('/jobs', jobsRouter)

export default router
