import { Router } from 'express'
import {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from '../../controllers/employees.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createEmployeesSchema, updateEmployeesSchema } from '../../schemas/employees.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getEmployees)
router.get('/:clientId', tokenGuard(), verifyToken(), getEmployeeById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(createEmployeesSchema), addEmployee)
router.put('/:clientId', tokenGuard(), verifyToken(), schemaGuard(updateEmployeesSchema), updateEmployee)
router.delete('/:clientId', tokenGuard(), verifyToken(), deleteEmployee)

export default router
