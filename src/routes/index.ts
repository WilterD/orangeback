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
import ordersRouter from './api/orders.routes'
import billsRouter from './api/bills.routes'
import cardBanksRouter from './api/cardBanks.routes'
import paymentsRouter from './api/payments.routes'
import supplyLinesRouter from './api/supplyLines.routes'
import productsRouter from './api/products.routes'
import stocksRouter from './api/stocks.routes'
import billingActivitiesRouter from './api/billingActivities.routes'

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
router.use('/orders', ordersRouter)
router.use('/bills', billsRouter)
router.use('/card-banks', cardBanksRouter)
router.use('/payments', paymentsRouter)
router.use('/supply-lines', supplyLinesRouter)
router.use('/products', productsRouter)
router.use('/stocks', stocksRouter)
router.use('billing-activities', billingActivitiesRouter)

export default router
