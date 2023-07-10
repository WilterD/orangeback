import { Router } from 'express'
import { schemaGuard } from '../../middlewares/schemaGuard'
import { createProductsSchema, updateProductsSchema } from '../../schemas/products.schema'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'
import { getProducts } from '../../controllers/products.controller/get'
import { getAllProducts } from '../../controllers/products.controller/getAll'
import { getProductById } from '../../controllers/products.controller/getById'
import { addProduct } from '../../controllers/products.controller/add'
import { updateProduct } from '../../controllers/products.controller/update'
import { deleteProduct } from '../../controllers/products.controller/delete'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', tokenGuard(), verifyToken(), paginationGuard(), getProducts)
router.get('/all', tokenGuard(), verifyToken(), paginationGuard(), getAllProducts)
router.get('/:productId', tokenGuard(), verifyToken(), getProductById)
router.post('/', tokenGuard(), verifyToken(), schemaGuard(createProductsSchema), addProduct)
router.put('/:productId', tokenGuard(), verifyToken(), schemaGuard(updateProductsSchema), updateProduct)
router.delete('/:productId', tokenGuard(), verifyToken(), deleteProduct)

export default router
