import express from 'express'
import * as sellerController from '../controllers/sellerController'

const sellerRoutes = express.Router()

sellerRoutes.post('/', sellerController.createSellerController)
sellerRoutes.get('/:userId', sellerController.getSellerStockController)
sellerRoutes.get('/:id/:userId', sellerController.getSellerStockByIdController)
sellerRoutes.delete('/:id/:userId', sellerController.deleteSellerController)

export default sellerRoutes
