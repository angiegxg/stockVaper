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

async function getSellerStockController(req: Request, res: Response) {
  const userId = req.params.userId
  try {
    const createSeller = await sellerService.getAllSellerStockService(+userId)
    res.json(createSeller)
  } catch (errors) {
    res.status(500).json({ error: 'Error al crear traer todos los vendedores' })
  }
}

async function getSellerStockByIdController(req: Request, res: Response) {
  const { id, userId } = req.params

  try {
    const sellerById = await sellerService.getAllSellerStockByIDService(+id, +userId)
    res.json(sellerById)
  } catch (errors) {
    res.status(500).json({ error: 'Error al crear el vendedor' })
  }
}

async function deleteSellerController(req: Request, res: Response) {
  const { id, userId } = req.params
  try {
    const deletedSeller = await sellerService.deleteSellerService(+id, +userId)

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
