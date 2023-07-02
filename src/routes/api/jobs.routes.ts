import { Router } from 'express'
import {
  getJobs,
  getJobById,
  addJob,
  updateJob,
  deleteJob
} from '../../controllers/jobs.controller'
import { schemaWard } from '../../middlewares/schemaWard'
import { jobsSchema } from '../../schemas/jobs.schema'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getJobs)
router.get('/:jobId', getJobById)
router.post('/', schemaWard(jobsSchema), addJob)
router.put('/:jobId', schemaWard(jobsSchema), updateJob)
router.delete('/:jobId', deleteJob)

export default router
