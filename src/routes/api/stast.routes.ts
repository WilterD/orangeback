import { Router } from 'express'
import { getNoEcoProductsByAgency } from '../../controllers/stast.controller/getNoEcoProductsByAgency'
import { getNoEcoProductsAll } from '../../controllers/stast.controller/getNoEcoProductsAll'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/no-eco-products-all', getNoEcoProductsAll)
router.get('/no-eco-products-by-agency/:agencyRif', getNoEcoProductsByAgency)



export default router
