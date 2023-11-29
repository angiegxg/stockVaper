import express from 'express'
import * as distributionController from '../controllers/distributionController'

const distributionRoutes = express.Router()

distributionRoutes.post('/', distributionController.createNewDistributionsController)
distributionRoutes.get('/', distributionController.getDistributionController)
distributionRoutes.get('/:id', distributionController.getDistributionByIdController)

export default distributionRoutes
