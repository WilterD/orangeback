import express from 'express'

import statesRouter from './api/states'

const router = express.Router()

router.use('/states', statesRouter)

export default router
