import { Router } from 'express'
import { getNoEcoProductsByAgency } from '../../controllers/stats.controller/getNoEcoProductsByAgency'
import { getNoEcoProductsAll } from '../../controllers/stats.controller/getNoEcoProductsAll'
import { getBestSellingProducts } from '../../controllers/stats.controller/GetBestSellingProducts'
import { getFakeClients } from '../../controllers/stats.controller/getFakeClients'
import { getEmployeesQuantityServicesPerMonth } from '../../controllers/stats.controller/getEmployeesQuantityServicesPerMonth'
import { getAgenciesEarnings } from '../../controllers/stats.controller/getAgenciesEarnings'
import { getFrequentModelsByService } from '../../controllers/stats.controller/getFrequentModelsByService'
import { getFrequentModelsByDate } from '../../controllers/stats.controller/getFrequentModelsByDate'
import { getFrequentClientsByDate } from '../../controllers/stats.controller/getFrequentClientsByDate'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/no-eco-products-all', getNoEcoProductsAll)
router.get('/no-eco-products-by-agency/:agencyRif', getNoEcoProductsByAgency)
router.get('/best-selling-products', getBestSellingProducts)
router.get('/fake-clients', getFakeClients)
router.get('/employee-services-per-month/:month', getEmployeesQuantityServicesPerMonth)
router.get('/agecies-earnings/start/:dateInit/end/:dateEnd', getAgenciesEarnings)
router.get('/fequent-model/service/:serviceId', getFrequentModelsByService)
router.get('/fequent-model/start/:dateInit/end/:dateEnd', getFrequentModelsByDate)
router.get('/frequent-clients/start/:dateInit/end/:dateEnd', getFrequentClientsByDate)

export default router
