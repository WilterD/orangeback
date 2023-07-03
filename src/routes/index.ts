import express from 'express'

import loginRouter from './api/login.routes'
import adminsRouter from './api/admins.routes'
import statesRouter from './api/states.routes'
import citiesRouter from './api/cities.routes'
import managersRouter from './api/managers.routes'
import agenciesRouter from './api/agencies.routes'
import jobsRouter from './api/jobs.routes'
import employeesRouter from './api/employees.routes'
import clientsRouter from './api/clients.routes'

const router = express.Router()

router.use('/login', loginRouter)
router.use('/admins', adminsRouter)
router.use('/states', statesRouter)
router.use('/cities', citiesRouter)
router.use('/managers', managersRouter)
router.use('/agencies', agenciesRouter)
router.use('/jobs', jobsRouter)
router.use('/employees', employeesRouter)
router.use('/clients', clientsRouter)

export default router
