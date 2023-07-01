import express from 'express'

import adminsRouter from './api/admins.routes'
import statesRouter from './api/states.routes'
import citiesRouter from './api/cities.routes'

const router = express.Router()

router.use('/admins', adminsRouter)
router.use('/states', statesRouter)
router.use('/cities', citiesRouter)

export default router
