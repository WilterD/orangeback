import { Router } from 'express'

import { getEmployeesCoordinateServices } from '../../controllers/employeesCoordinateServices.controller/get'
import { getEmployeeCoordinateServiceById } from '../../controllers/employeesCoordinateServices.controller/getById'
import { addEmployeeCoordinateService } from '../../controllers/employeesCoordinateServices.controller/add'
import { updateEmployeeCoordinateService } from '../../controllers/employeesCoordinateServices.controller/update'
import { deleteEmployeeCoordinateService } from '../../controllers/employeesCoordinateServices.controller/delete'

import { schemaGuard } from '../../middlewares/schemaGuard'
import {
  createEmployeesCoordinateServicesSchema,
  updateEmployeesCoordinateServicesSchema
} from '../../schemas/employeesCoordinateServices.Schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get(
  '/',
  tokenGuard(),
  verifyToken(),
  paginationGuard(),
  getEmployeesCoordinateServices
)
router.get(
  '/employee/:employeeDni/service/:serviceId',
  tokenGuard(),
  verifyToken(),
  getEmployeeCoordinateServiceById
)
router.post(
  '/',
  tokenGuard(),
  verifyToken(),
  schemaGuard(createEmployeesCoordinateServicesSchema),
  addEmployeeCoordinateService
)
router.put(
  '/employee/:employeeDni/service/:serviceId',
  tokenGuard(),
  verifyToken(),
  schemaGuard(updateEmployeesCoordinateServicesSchema),
  updateEmployeeCoordinateService
)
router.delete(
  '/employee/:employeeDni/service/:serviceId',
  tokenGuard(),
  verifyToken(),
  deleteEmployeeCoordinateService
)

export default router
