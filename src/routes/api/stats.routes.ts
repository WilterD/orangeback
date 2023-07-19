import { Router } from 'express'
import { getNoEcoProductsByAgency } from '../../controllers/stats.controller/getNoEcoProductsByAgency'
import { getNoEcoProductsAll } from '../../controllers/stats.controller/getNoEcoProductsAll'
import { getBestSellingProducts } from '../../controllers/stats.controller/getBestSellingProducts'
import { getFakeClients } from '../../controllers/stats.controller/getFakeClients'
// import { getEmployeesQuantityServicesPerMonth } from '../../controllers/stats.controller/getEmployeesQuantityServicesPerMonth'
// import { getAgenciesEarnings } from '../../controllers/stats.controller/getAgenciesEarnings'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/no-eco-products-all', getNoEcoProductsAll)
router.get('/no-eco-products-by-agency/:agencyRif', getNoEcoProductsByAgency)
router.get('/best-selling-products', getBestSellingProducts)
router.get('/fake-clients', getFakeClients)

// No sirve, necesita validación en el param para recibir un mes valido
// router.get('/employee-services-per-month/:month', getEmployeesQuantityServicesPerMonth)

// Casi funciona falta manejo de fechas en la query
// router.get('/agecies-earnings/start/:dateInit/end/:dateEnd', getAgenciesEarnings)
export default router
