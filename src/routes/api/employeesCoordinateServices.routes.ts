import { Router } from 'express'
import {
  getEmployeesCoordinateServices,
  getEmployeeCoordinateServiceById,
  addEmployeeCoordinateService,
  updateEmployeeCoordinateService,
  deleteEmployeeCoordinateService
} from '../../controllers/employeesCoordinateServices.controller'
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
  '/employee/:employeeId/service/:serviceId',
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
  '/employee/:employeeId/service/:serviceId',
  tokenGuard(),
  verifyToken(),
  schemaGuard(updateEmployeesCoordinateServicesSchema),
  updateEmployeeCoordinateService
)
router.delete(
  '/employee/:employeeId/service/:serviceId',
  tokenGuard(),
  verifyToken(),
  deleteEmployeeCoordinateService
)

export default router
