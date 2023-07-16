import { Router } from 'express'
import { getNoEcoProductsByAgency } from '../../controllers/stats.controller/getNoEcoProductsByAgency'
import { getNoEcoProductsAll } from '../../controllers/stats.controller/getNoEcoProductsAll'
import { getFakeClients } from '../../controllers/stats.controller/getFakeClients'
import { GetEmployeeWorkList } from '../../controllers/stats.controller'
const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/no-eco-products-all', getNoEcoProductsAll)
router.get('/no-eco-products-by-agency/:agencyRif', getNoEcoProductsByAgency)
router.get('/fake-clients', getFakeClients)
router.get('/employee-work-list', GetEmployeeWorkList)
export default router
