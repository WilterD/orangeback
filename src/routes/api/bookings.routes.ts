import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { bookingsCreateSchema, bookingsUpdateSchema } from '../../schemas/bookings.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

import { getBookings } from '../../controllers/bookings.controller/get'
import { getBookingById } from '../../controllers/bookings.controller/getById'
import { addBooking } from '../../controllers/bookings.controller/add'
import { updateBooking } from '../../controllers/bookings.controller/update'
import { deleteBooking } from '../../controllers/bookings.controller/delete'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getBookings)
router.get('/:bookingId', tokenGuard(), verifyToken(), getBookingById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(bookingsCreateSchema), addBooking)
router.put('/:bookingId', tokenGuard(), verifyToken(), schemaGuard(bookingsUpdateSchema), updateBooking)
router.delete('/:bookingId', tokenGuard(), verifyToken(), deleteBooking)

export default router
