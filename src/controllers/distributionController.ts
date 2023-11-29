import { Request, Response } from 'express'
import { Distribution } from '../types'
import * as distributionService from '../services/distributionService'

async function createNewDistributionsController(req: Request, res: Response) {
  try {
    const distributions = req.body as Distribution[]
    const results = await distributionService.transferStocksService(distributions)

    const successfulDistributions = results.filter((result) => result !== null) as Distribution[]
    const failedDistributions = results.filter((result) => result === null)

    if (successfulDistributions.length > 0) {
      return res.status(201).json({ message: 'Nuevas distribuciones creadas', successfulDistributions })
    } else {
      return res.status(500).json({ message: 'Error al crear las distribuciones', failedDistributions })
    }
  } catch (error) {
    console.error('Error al procesar la solicitud', error)
    return res.status(500).json({ message: 'Error interno del servidor', error })
  }
}
const getDistributionController = async (_req: Request, res: Response) => {
  try {
    const allDistribution = await distributionService.getAllDistributionService()

    res.json(allDistribution)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al traer el listado de distribuciones' })
  }
}

async function getDistributionByIdController(req: Request, res: Response) {
  const distributionId = parseInt(req.params.id)

  try {
    const distribution = await distributionService.getDistributionByIdService(distributionId)
    if (distribution) {
      res.json(distribution)
    } else {
      res.status(404).json({ error: 'No se encontraron registros de la distribucion' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la distribucion por id' })
  }
}

export { createNewDistributionsController, getDistributionController, getDistributionByIdController }
