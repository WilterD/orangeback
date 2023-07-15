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
import vehiclesRouter from './api/vehicles.routes'
import servicesRouter from './api/services.routes'
import employeesCoordServicesRouter from './api/employeesCoordinateServices.routes'
import bookingsRouter from './api/bookings.routes'
import supplyLinesRouter from './api/supplyLines.routes'
import cardBanksRouter from './api/cardBanks.routes'
import billsRouter from './api/bills.routes'
import paymentsRouter from './api/payments.routes'

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
router.use('/vehicles', vehiclesRouter)
router.use('/services', servicesRouter)
router.use('/employees-coordinate-services', employeesCoordServicesRouter)
router.use('/bookings', bookingsRouter)
router.use('/supply-lines', supplyLinesRouter)
router.use('/cardbanks', cardBanksRouter)
router.use('/bills', billsRouter)
router.use('/payments', paymentsRouter)

export default router
