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

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', paginationGuard(), getCities)
router.get('/:cityId', getCityById)
router.post('/', schemaGuard(citiesSchema), addCity)
router.put('/:cityId', schemaGuard(citiesSchema), updateCity)
router.delete('/:cityId', deleteCity)

export default router
