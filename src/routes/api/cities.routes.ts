import { Router } from 'express'
import {
  getCities,
  getCityById,
  addCity,
  updateCity,
  deleteCity
} from '../../controllers/cities.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { citiesSchema } from '../../schemas/cities.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getCities)
router.get('/:cityId', tokenGuard(), verifyToken(), getCityById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(citiesSchema), addCity)
router.put('/:cityId', tokenGuard(), verifyToken(), schemaGuard(citiesSchema), updateCity)
router.delete('/:cityId', tokenGuard(), verifyToken(), deleteCity)

export default router
