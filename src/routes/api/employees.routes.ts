import { Router } from 'express'
import {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from '../../controllers/employees.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createEmployeesSchema, updateEmployeesSchema } from '../../schemas/employees.Schema'
import { paginationGuard } from '../../middlewares/paginationGuard'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', paginationGuard(), getEmployees)
router.get('/:employeeId', getEmployeeById)
router.post('/', schemaGuard(createEmployeesSchema), addEmployee)
router.put('/:employeeId', schemaGuard(updateEmployeesSchema), updateEmployee)
router.delete('/:employeeId', deleteEmployee)

export default router
