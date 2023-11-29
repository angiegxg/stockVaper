import express from 'express'
import * as saleController from '../controllers/saleController'

const saleRoutes = express.Router()

saleRoutes.post('/', saleController.createSaleController)
saleRoutes.delete('/:id', saleController.goBackSaleController)
saleRoutes.get('/', saleController.getAllSaleController)

export default saleRoutes
