import express from 'express'

import loginRouter from './api/login.routes'
import adminsRouter from './api/admins.routes'
import statesRouter from './api/states.routes'
import citiesRouter from './api/cities.routes'
import managersRouter from './api/managers.routes'
import agenciesRouter from './api/agencies.routes'
import discountsRouter from './api/discounts.routes'
import jobsRouter from './api/jobs.routes'
import employeesRouter from './api/employees.routes'
import clientsRouter from './api/clients.routes'
import modelsRouter from './api/models.routes'
import servicesRouter from './api/services.routes'
import employeesCoordServicesRouter from './api/employeesCoordinateServices.routes'
import bookingsRouter from './api/bookings.routes'

const router = express.Router()

router.use('/login', loginRouter)
router.use('/admins', adminsRouter)
router.use('/states', statesRouter)
router.use('/cities', citiesRouter)
router.use('/managers', managersRouter)
router.use('/agencies', agenciesRouter)
router.use('/discounts', discountsRouter)
router.use('/jobs', jobsRouter)
router.use('/employees', employeesRouter)
router.use('/clients', clientsRouter)
router.use('/models', modelsRouter)
router.use('/services', servicesRouter)
router.use('/employees-coordinate-services', employeesCoordServicesRouter)
router.use('/bookings', bookingsRouter)

export default router
