import { Router } from 'express'
import {
  getJobs,
  getJobById,
  addJob,
  updateJob,
  deleteJob
} from '../../controllers/jobs.controller'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { jobsSchema } from '../../schemas/jobs.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getJobs)
router.get('/:jobId', tokenGuard(), verifyToken(), getJobById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(jobsSchema), addJob)
router.put('/:jobId', tokenGuard(), verifyToken(), schemaGuard(jobsSchema), updateJob)
router.delete('/:jobId', tokenGuard(), verifyToken(), deleteJob)

export default router
