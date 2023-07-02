import express from 'express'

import adminsRouter from './api/admins.routes'
import statesRouter from './api/states.routes'
import citiesRouter from './api/cities.routes'
import managersRouter from './api/managers.routes'
import employeesRouter from './api/employees.routes'

const router = express.Router()

router.use('/admins', adminsRouter)
router.use('/states', statesRouter)
router.use('/cities', citiesRouter)
router.use('/managers', managersRouter)
router.use('/employees', employeesRouter)

export default router
