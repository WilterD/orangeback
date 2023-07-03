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

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', paginationGuard(), getJobs)
router.get('/:jobId', getJobById)
router.post('/', schemaGuard(jobsSchema), addJob)
router.put('/:jobId', schemaGuard(jobsSchema), updateJob)
router.delete('/:jobId', deleteJob)

export default router
