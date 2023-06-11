import express from 'express'

import estadosRouter from './api/estados'

const router = express.Router()

router.use('/estados', estadosRouter)

export default router
