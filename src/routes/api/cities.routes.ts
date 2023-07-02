import { Router } from 'express'
import {
  getCities,
  getCityById,
  addCity,
  updateCity,
  deleteCity
} from '../../controllers/cities.controller'
import { schemaWard } from '../../middlewares/schemaWard'
import { citiesSchema } from '../../schemas/cities.schema'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getCities)
router.get('/:cityId', getCityById)
router.post('/', schemaWard(citiesSchema), addCity)
router.put('/:cityId', schemaWard(citiesSchema), updateCity)
router.delete('/:cityId', deleteCity)

export default router
