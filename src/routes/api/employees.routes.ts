import { Router } from 'express'
import {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from '../../controllers/employees.controller'
import { schemaWard } from '../../middlewares/schemaWard'
import { createEmployeeSchema } from '../../schemas/createemployee.schema'
import { updateEmployeeSchema } from '../../schemas/updateemployee.schema'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getEmployees)
router.get('/:employeeId', getEmployeeById)
router.post('/', schemaWard(createEmployeeSchema), addEmployee)
router.put('/:employeeId', schemaWard(updateEmployeeSchema), updateEmployee)
router.delete('/:employeeId', deleteEmployee)

export default router
