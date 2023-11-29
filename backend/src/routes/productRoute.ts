import express from 'express'
import * as productController from '../controllers/productController'

const productRoutes = express.Router()

productRoutes.post('/', productController.createProductController)
productRoutes.get('/', productController.getAllProductsController)
export default productRoutes
