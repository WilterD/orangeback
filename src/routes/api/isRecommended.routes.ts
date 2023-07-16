import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { isRecommended, isRecommendedUpdate } from '../../schemas/models.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { getRecommendations } from '../../controllers/recommendations.controller/getRecommendations.action'
import { getRecommendationById } from '../../controllers/recommendations.controller/getRecommendationById.action'
import { addRecommendation } from '../../controllers/recommendations.controller/addRecommendation.action'
import { deleteRecommendation } from '../../controllers/recommendations.controller/deleteRecommendations.action'
import { updateRecommendations } from '../../controllers/recommendations.controller/updateRecommendations.action'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get(
  '/',
  tokenGuard(),
  verifyToken(),
  paginationGuard(),
  getRecommendations
)
router.get('/:modelId', tokenGuard(), verifyToken(), getRecommendationById)
router.post(
  '/:modelId',
  tokenGuard(),
  verifyToken(),
  schemaGuard(isRecommended),
  addRecommendation
)
router.put(
  '/model/:modelId/service/:serviceId/mileage/:mileage',
  tokenGuard(),
  verifyToken(),
  schemaGuard(isRecommendedUpdate),
  updateRecommendations
)
router.delete(
  '/model/:modelId/service/:serviceId/mileage/:mileage',
  tokenGuard(),
  verifyToken(),
  deleteRecommendation
)

export default router
