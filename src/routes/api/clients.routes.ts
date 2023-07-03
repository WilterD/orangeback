import { Router } from 'express'
import {
  getClients,
  getClientById,
  addClient,
  updateClient,
  deleteClient
} from '../../controllers/clients.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { createClientsSchema, updateClientsSchema } from '../../schemas/clients.schema'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getClients)
router.get('/:clientId', tokenGuard(), verifyToken(), getClientById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(createClientsSchema), addClient)
router.put('/:clientId', tokenGuard(), verifyToken(), schemaGuard(updateClientsSchema), updateClient)
router.delete('/:clientId', tokenGuard(), verifyToken(), deleteClient)

export default router
