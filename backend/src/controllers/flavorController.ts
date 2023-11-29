import { Request, Response } from 'express'
import * as flavorService from '../services/flavorService'

async function createFlavor(req: Request, res: Response) {
  const flavors = req.body.flavors

  try {
    const createdFlavors = await flavorService.createFlavorService(flavors)

    return res.json(createdFlavors)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

async function getAllflavorController(_req: Request, res: Response) {
  try {
    const flavors = await flavorService.getAllFlavorService()

    return res.json(flavors)
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener las ventas' })
  }
}

export { createFlavor, getAllflavorController }
