import { Request, Response } from 'express'
import * as sellerService from '../services/sellerService'

async function createSellerController(req: Request, res: Response) {
  const seller = req.body.seller

  try {
    const createSeller = await sellerService.createSellerService(seller)
    res.json(createSeller)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

async function getSellerStockController(_req: Request, res: Response) {
  try {
    const createSeller = await sellerService.getAllSellerStockService()
    res.json(createSeller)
  } catch (errors) {
    res.status(500).json({ error: 'Error al crear traer todos los vendedores' })
  }
}

async function getSellerStockByIdController(req: Request, res: Response) {
  const { id } = req.params

  try {
    const sellerById = await sellerService.getAllSellerStockByIDService(+id)
    res.json(sellerById)
  } catch (errors) {
    res.status(500).json({ error: 'Error al crear el vendedor' })
  }
}

async function deleteSellerController(req: Request, res: Response) {
  const { id } = req.params
  try {
    const deletedSeller = await sellerService.deleteSellerService(parseInt(id))

    if (deletedSeller) {
      return res.json(deletedSeller)
    } else {
      return res.status(404).json({ error: 'Vendedor no encontrado' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error al borrar vendedor' })
  }
}

export { createSellerController, getSellerStockController, deleteSellerController, getSellerStockByIdController }
