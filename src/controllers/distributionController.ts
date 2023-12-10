import { Request, Response } from 'express'
import { Distribution } from '../types'
import * as distributionService from '../services/distributionService'

async function createNewDistributionsController(req: Request, res: Response) {
  try {
    const distributions = req.body.distribution as Distribution[]
    console.log('estoy en el controlller distribution:', distributions)
    const userId = req.body.userId
    console.log('estoy en el controlller distribution UserID:', userId)
    const results = await distributionService.transferStocksService(distributions, userId)

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
const getDistributionController = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const allDistribution = await distributionService.getAllDistributionService(+userId)

    res.json(allDistribution)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al traer el listado de distribuciones' })
  }
}

async function getDistributionByIdController(req: Request, res: Response) {
  const { id, userId } = req.params

  try {
    const distribution = await distributionService.getDistributionByIdService(+id, +userId)
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
