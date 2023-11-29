import express from 'express'
import * as stockController from '../controllers/stockController'

const stockRoutes = express.Router()

stockRoutes.post('/', stockController.createStockController)
stockRoutes.get('/', stockController.getAllStockController)
stockRoutes.delete('/:id', stockController.deleteStockController)
stockRoutes.put('/:id', stockController.updateStockController)
stockRoutes.get('/stock-product/:productId/flavor/:flavorId', stockController.getStockByFlavorProductController)

export default stockRoutes
