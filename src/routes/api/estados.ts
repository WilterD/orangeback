import { Router } from 'express'
import {
  getEstados,
  getEstadosById,
  addEstados,
  deleteEstados,
  updateEstados
} from '../../controllers/estados.controller'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getEstados)
router.get('/:estadoId', getEstadosById)
router.post('/', addEstados)
router.put('/:estadoId', updateEstados)
router.delete('/:estadoId', deleteEstados)

export default router
