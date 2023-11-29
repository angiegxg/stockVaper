import { Request, Response } from 'express'
import * as stockService from '../services/stockService'

async function createStockController(req: Request, res: Response) {
  const newStock = req.body

  try {
    const createStock = await stockService.createStockService(newStock)

    res.json(createStock)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear el nuevo stock' })
  }
}

async function getAllStockController(_req: Request, res: Response) {
  try {
    const allStock = await stockService.getAllStockService()

    res.json(allStock)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear el nuevo stock' })
  }
}
async function deleteStockController(req: Request, res: Response) {
  const stockId = parseInt(req.params.id)
  try {
    const deletedStock = await stockService.deleteStockService(stockId)
    if (deletedStock) {
      res.json({ message: 'Stock eliminado correctamente' })
    } else {
      res.status(404).json({ error: 'Stock no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el stock' })
  }
}

async function updateStockController(req: Request, res: Response) {
  const { id, quantity } = req.body

  try {
    const updatedStock = await stockService.updateQuantityStockService(id, quantity)
    res.json(updatedStock)
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el stock' })
  }
}

async function getStockBySellerController(req: Request, res: Response) {
  const sellerId = parseInt(req.params.sellerId)

  try {
    const sellerStock = await stockService.getStockBySellerService(sellerId)
    if (sellerStock) {
      res.json(sellerStock)
    } else {
      res.status(404).json({ error: 'No se encontraron registros de stock para este vendedor' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el stock por vendedor' })
  }
}

async function getStockByFlavorProductController(req: Request, res: Response) {
  const productId = parseInt(req.params.productId)
  const flavorId = parseInt(req.params.flavorId)

  try {
    const flavorProductStock = await stockService.getStockByFlavorProductService(productId, flavorId)
    if (flavorProductStock) {
      res.json(flavorProductStock)
    } else {
      res.status(404).json({ error: 'No se encontraron registros de stock para este producto y sabor' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al obtener el stock por producto y sabor' })
  }
}

export {
  createStockController,
  getAllStockController,
  deleteStockController,
  updateStockController,
  getStockBySellerController,
  getStockByFlavorProductController,
}
