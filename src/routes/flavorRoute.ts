import express from 'express'
import * as flavorController from '../controllers/flavorController'

const flavorRoutes = express.Router()

flavorRoutes.post('/', flavorController.createFlavor)
flavorRoutes.get('/:userId', flavorController.getAllflavorController)

export default flavorRoutes
