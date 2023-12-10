import { Request, Response } from 'express'
import * as saleService from '../services/saleService'

async function createSaleController(req: Request, res: Response) {
  const { sale, userId } = req.body

  try {
    const newSale = await saleService.createSaleService(sale, +userId)
    res.json(newSale)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear la venta' })
  }
}

async function goBackSaleController(req: Request, res: Response) {
  const { id, userId } = req.params
  try {
    const deletedSale = await saleService.goBackSaleService(+id, +userId)

    if (deletedSale) {
      return res.json(deletedSale)
    } else {
      return res.status(404).json({ error: 'Venta no encontrada' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error al revertir la venta' })
  }
}

async function getAllSaleController(req: Request, res: Response) {
  const { userId } = req.params
  try {
    const sales = await saleService.getAllSaleService(+userId)

    return res.json(sales)
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener las ventas' })
  }
}

export { createSaleController, goBackSaleController, getAllSaleController }
