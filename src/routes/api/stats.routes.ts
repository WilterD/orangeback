import { Router } from 'express'
import { getNoEcoProductsByAgency } from '../../controllers/stats.controller/getNoEcoProductsByAgency'
import { getNoEcoProductsAll } from '../../controllers/stats.controller/getNoEcoProductsAll'
import { getFakeClients } from '../../controllers/stats.controller/getFakeClients'
import { getEmployeeWorkList } from '../../controllers/stats.controller/GetEmployeeWorkList'
import { getBestSellingProducts } from '../../controllers/stats.controller/GetBestSellingProducts'
import { getFrequentModelsService } from '../../controllers/stats.controller/GetFrequentModelsService'
import { getFrequentModelsDate } from '../../controllers/stats.controller/GetFrequentModelsDate'
import { getAgenciesEarnsMost } from '../../controllers/stats.controller/GetAgenciesEarnsMost'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/no-eco-products-all', getNoEcoProductsAll)
router.get('/no-eco-products-by-agency/:agencyRif', getNoEcoProductsByAgency)
router.get('/fake-clients', getFakeClients)
router.get('/employee-work-list', getEmployeeWorkList)
router.get('best-selling-products', getBestSellingProducts)
router.get('frequent-models-service', getFrequentModelsService)
router.get('frequent-models-date', getFrequentModelsDate)
router.get('agencies-earns-most', getAgenciesEarnsMost)
export default router
