import { Request, Response } from 'express'
import * as productService from '../services/productService'

const createProductController = async (req: Request, res: Response) => {
  const product = req.body.product
  const flavor = req.body.flavorIds

  try {
    const createProduct = await productService.createProductService(product, flavor)
    res.json(createProduct)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear lel producto' })
  }
}
const getAllProductsController = async (_req: Request, res: Response) => {
  try {
    const allProducts = await productService.getAllProductService()

    res.json(allProducts)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' })
  }
}

export { createProductController, getAllProductsController }
