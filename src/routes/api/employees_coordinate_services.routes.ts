import { Router } from 'express'
import {
  getEmployees_Coordinate_Services,
  getEmployee_Coordinate_ServiceById,
  addEmployee_Coordinate_Service,
  updateEmployee_Coordinate_Service,
  deleteEmployee_Coordinate_Service
} from '../../controllers/employees_coordinate_services.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { employees_coordinate_servicesSchema, employees_coordinate_servicesUpdateSchema } from '../../schemas/employees_coordinate_services.Schema'
// import { paginationGuard } from '../../middlewares/paginationGuard'
// import { tokenGuard } from '../../middlewares/tokenGuard'
// import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getEmployees_Coordinate_Services)
router.get('/:coordId/:serviceId', getEmployee_Coordinate_ServiceById)
router.post('/', schemaGuard(employees_coordinate_servicesSchema), addEmployee_Coordinate_Service)
router.put('/:coordId/:serviceId', schemaGuard(employees_coordinate_servicesUpdateSchema), updateEmployee_Coordinate_Service)
router.delete('/:coordId/:serviceId', deleteEmployee_Coordinate_Service)

export default router
