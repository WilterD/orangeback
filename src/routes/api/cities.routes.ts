import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { citiesSchema } from '../../schemas/cities.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { getCities } from '../../controllers/cities.controller/get'
import { getAllCities } from '../../controllers/cities.controller/getAll'
import { getCityById } from '../../controllers/cities.controller/getById'
import { addCity } from '../../controllers/cities.controller/add'
import { updateCity } from '../../controllers/cities.controller/update'
import { deleteCity } from '../../controllers/cities.controller/delete'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getCities)
router.get('/all', tokenGuard(), verifyToken(), paginationGuard(), getAllCities)
router.get('/:cityId', tokenGuard(), verifyToken(), getCityById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(citiesSchema), addCity)
router.put('/:cityId', tokenGuard(), verifyToken(), schemaGuard(citiesSchema), updateCity)
router.delete('/:cityId', tokenGuard(), verifyToken(), deleteCity)

export default router
