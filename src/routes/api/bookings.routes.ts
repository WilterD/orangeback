import { Router } from 'express'
import {
  getBookings,
  getBookingById,
  addBooking,
  updateBooking,
  deleteBooking
} from '../../controllers/bookings.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { bookingsCreateSchema, bookingsUpdateSchema } from '../../schemas/bookings.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getBookings)
router.get('/:bookingId', tokenGuard(), verifyToken(), getBookingById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(bookingsCreateSchema), addBooking)
router.put('/:bookingId', tokenGuard(), verifyToken(), schemaGuard(bookingsUpdateSchema), updateBooking)
router.delete('/:bookingId', tokenGuard(), verifyToken(), deleteBooking)

export default router
