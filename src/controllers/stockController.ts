import { Request, Response } from 'express'
import * as stockService from '../services/stockService'

async function createStockController(req: Request, res: Response) {
  const { stock, userId } = req.body

  try {
    const createStock = await stockService.createStockService(stock, userId)

    res.json(createStock)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear el nuevo stock' })
  }
}

async function getAllStockController(req: Request, res: Response) {
  const { userId } = req.params
  try {
    const allStock = await stockService.getAllStockService(+userId)

    res.json(allStock)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear el nuevo stock' })
  }
}
async function deleteStockController(req: Request, res: Response) {
  const { id, userId } = req.params
  try {
    const deletedStock = await stockService.deleteStockService(+id, +userId)
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
  const { id, quantity, userId } = req.body

  try {
    const updatedStock = await stockService.updateQuantityStockService(id, quantity, userId)
    res.json(updatedStock)
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el stock' })
  }
}

async function getStockBySellerController(req: Request, res: Response) {
  const { id, userId } = req.params

  try {
    const sellerStock = await stockService.getStockBySellerService(+id, +userId)
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
