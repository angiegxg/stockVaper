import express from 'express'
import * as sellerController from '../controllers/sellerController'

const sellerRoutes = express.Router()

sellerRoutes.post('/', sellerController.createSellerController)
sellerRoutes.get('/', sellerController.getSellerStockController)
sellerRoutes.get('/:id', sellerController.getSellerStockByIdController)
sellerRoutes.delete('/:id', sellerController.deleteSellerController)

export default sellerRoutes
