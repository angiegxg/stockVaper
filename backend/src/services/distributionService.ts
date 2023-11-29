import { PrismaClient } from '@prisma/client'
import { Distribution, Stock } from '../types'
import * as stockService from './stockService'

const prisma = new PrismaClient()

async function checkStock(stock: Stock): Promise<Stock | null> {
  let stockCheck: Stock | null = null

  if (stock.productId !== undefined && stock.flavorId !== undefined && stock.sellerId !== undefined) {
    try {
      console.log(
        'Antes de la llamada a checkStockExistsService - productId:',
        stock.productId,
        'flavorId:',
        stock.flavorId,
        'sellerId:',
        stock.sellerId,
      )
      stockCheck = await stockService.checkStockExistsService(stock.productId, stock.flavorId, stock.sellerId)
      console.log('Después de la llamada a checkStockExistsService - stockCheck:', stockCheck)
    } catch (error) {
      console.error('Error al verificar el stock:', error)
    }
  } else {
    console.error('Al menos una de las propiedades (productId, flavorId, sellerId) es undefined.')
  }

  return stockCheck
}

function calculateNewStockQuantities(
  fromStockQuantity: number,
  toStockQuantity: number,
  quantity: number,
): { newFromStockQuantity: number; newToStockQuantity: number; quantityDistribution: number } {
  const quantityDistribution = Math.min(quantity, fromStockQuantity)
  const newFromStockQuantity = fromStockQuantity - quantityDistribution
  const newToStockQuantity = toStockQuantity + quantityDistribution
  return { newFromStockQuantity, newToStockQuantity, quantityDistribution }
}

async function updateStockQuantities(
  fromStockId: number,
  toStockId: number,
  newFromStockQuantity: number,
  newToStockQuantity: number,
): Promise<void> {
  try {
    await Promise.all([
      stockService.updateQuantityStockService(fromStockId, newFromStockQuantity),
      stockService.updateQuantityStockService(toStockId, newToStockQuantity),
    ])
  } catch (error) {
    console.error('Error al actualizar los stocks:', error)
    throw new Error('No se ha podido actualizar los stocks.')
  }
}

async function createNewDistribution(quantity: number, fromStockId: number, toStockId: number): Promise<Distribution | null> {
  try {
    if (quantity === 0) {
      console.error('El vendedor de origen no tiene productos para distribuir')
      throw new Error('El vendedor de origen no tiene productos para distribuir')
    }

    return await prisma.distribution.create({
      data: {
        quantity,
        fromStockId,
        toStockId,
      },
    })
  } catch (error) {
    throw error
  }
}

async function transferStockAndCreateDistribution(
  fromStock: Stock,
  toStock: Stock,
  quantity: number,
  fromStockId: number,
  toStockId: number,
): Promise<Distribution | null> {
  const { newFromStockQuantity, newToStockQuantity, quantityDistribution } = calculateNewStockQuantities(
    fromStock.quantity,
    toStock.quantity,
    quantity,
  )
  await updateStockQuantities(fromStockId, toStockId, newFromStockQuantity, newToStockQuantity)
  return createNewDistribution(quantityDistribution, fromStockId, toStockId)
}

async function getAllDistributionService(): Promise<Distribution[]> {
  const distribution = await prisma.distribution.findMany({})

  return distribution
}

async function getDistributionByIdService(id: number): Promise<Distribution | null> {
  const DistributionById = await prisma.distribution.findUnique({
    where: { id },
    include: { sentFromStock: true, receivedAtStock: true },
  })

  return DistributionById || null
}

async function transferStocksService(distributions: Distribution[]): Promise<Distribution[]> {
  const results: (Distribution | null)[] = []

  for (const distribution of distributions) {
    const { quantity, sentFromStock, receivedAtStock } = distribution

    const fromStocknew = await checkStock(sentFromStock!)
    if (!fromStocknew) {
      throw new Error(`El stock desde donde se quiere hacer la distribucion no existe`)
    }

    let toStocknew = await checkStock(receivedAtStock!)

    if (!toStocknew) {
      const newtoStock: Stock = {
        productId: receivedAtStock!.productId,
        flavorId: receivedAtStock!.flavorId,
        quantity: 0,
        sellerId: receivedAtStock!.sellerId,
      }
      toStocknew = await stockService.createstockNewService(newtoStock)
    }

    if (fromStocknew && toStocknew && fromStocknew.productId === toStocknew.flavorId) {
      try {
        const result = await transferStockAndCreateDistribution(fromStocknew, toStocknew, quantity, fromStocknew.id!, toStocknew.id!)
        results.push(result)
      } catch (error) {
        console.error('Error en la transacción:', error)
        results.push(null)
      }
    } else {
      console.error('No se pueden transferir productos de tipos diferentes.')
      results.push(null)
    }
  }

  return results.filter((result): result is Distribution => result !== null)
}

export { transferStocksService, getAllDistributionService, getDistributionByIdService }
