import express from 'express'
import * as saleController from '../controllers/saleController'

const saleRoutes = express.Router()

saleRoutes.post('/', saleController.createSaleController)
saleRoutes.delete('/:id/:userId', saleController.goBackSaleController)
saleRoutes.get('/:userId', saleController.getAllSaleController)

export default saleRoutes
