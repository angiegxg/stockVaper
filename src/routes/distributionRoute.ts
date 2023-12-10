import express from 'express'
import * as distributionController from '../controllers/distributionController'

const distributionRoutes = express.Router()

distributionRoutes.post('/', distributionController.createNewDistributionsController)
distributionRoutes.get('/:userId', distributionController.getDistributionController)
distributionRoutes.get('/:id/:userId', distributionController.getDistributionByIdController)

export default distributionRoutes
