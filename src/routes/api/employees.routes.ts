import { Router } from 'express'

import { getEmployees } from '../../controllers/employees.controller/get'
import getEmployeesAll from '../../controllers/employees.controller/getAllEmployees.action'
import { getEmployeeById } from '../../controllers/employees.controller/getById'
import { addEmployee } from '../../controllers/employees.controller/add'
import { updateEmployee } from '../../controllers/employees.controller/update'
import { deleteEmployee } from '../../controllers/employees.controller/delete'

import { schemaGuard } from '../../middlewares/schemaGuard'
import {
  createEmployeesSchema,
  updateEmployeesSchema
} from '../../schemas/employees.Schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getEmployees)
router.get('/all', tokenGuard(), verifyToken(), getEmployeesAll)
router.get('/:employeeDni', tokenGuard(), verifyToken(), getEmployeeById)
router.post(
  '/',
  tokenGuard(),
  verifyToken(),
  schemaGuard(createEmployeesSchema),
  addEmployee
)
router.put(
  '/:employeeDni',
  tokenGuard(),
  verifyToken(),
  schemaGuard(updateEmployeesSchema),
  updateEmployee
)
router.delete('/:employeeDni', tokenGuard(), verifyToken(), deleteEmployee)

export default router
