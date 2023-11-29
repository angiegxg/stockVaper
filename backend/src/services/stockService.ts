import { PrismaClient } from '@prisma/client'
import { Stock } from '../types'

const prisma = new PrismaClient()

async function createstockNewService(stock: Stock): Promise<Stock> {
  const { productId, flavorId, quantity, sellerId } = stock
  const createStock = await prisma.stock.create({
    data: {
      productId,
      flavorId,
      quantity,
      sellerId,
    },
  })

  return createStock
}

async function checkStockExistsService(productId: number, flavorId: number, sellerId: number): Promise<Stock | null> {
  const existingStock = await prisma.stock.findFirst({
    where: { productId, flavorId, sellerId },
    select: { id: true, productId: true, flavorId: true, sellerId: true, quantity: true },
  })

  return existingStock || null
}

async function getStockBySellerService(sellerId: number): Promise<Stock[] | null> {
  const sellerStock = await prisma.stock.findMany({
    where: { sellerId },
    select: { id: true, productId: true, flavorId: true, sellerId: true, quantity: true },
  })

  return sellerStock.length > 0 ? sellerStock : null
}

async function getStockByFlavorProductService(productId: number, flavorId: number): Promise<Stock[] | null> {
  const flavorProductStock = await prisma.stock.findMany({
    where: { productId, flavorId },
    select: { id: true, productId: true, flavorId: true, sellerId: true, quantity: true },
  })

  return flavorProductStock.length > 0 ? flavorProductStock : null
}

async function getAllStockService(): Promise<Stock[] | null> {
  const flavorProductStock = await prisma.stock.findMany({
    include: {
      seller: true,
      product: {
        include: {
          product: true,
          flavor: true,
        },
      },
    },
  })

  return flavorProductStock.length > 0 ? flavorProductStock : null
}

async function updateQuantityStockService(id: number, quantity: number): Promise<Stock> {
  const updateStock = await prisma.stock.update({
    where: { id },
    data: {
      quantity,
    },
  })

  console.log(updateStock)

  return updateStock
}

async function createStockService(stock: Stock): Promise<Stock> {
  const { productId, flavorId, quantity, sellerId } = stock

  const existingStock = await checkStockExistsService(productId, flavorId, sellerId)

  if (existingStock) {
    return await updateQuantityStockService(existingStock.id!, quantity)
  } else {
    return await createstockNewService(stock)
  }
}

async function deleteStockService(id: number): Promise<Stock | null> {
  const deletedStock = await prisma.stock.delete({
    where: { id },
  })

  return deletedStock
}

async function getStockByIdService(id: number): Promise<Stock | null> {
  const stockById = await prisma.stock.findUnique({
    where: { id },
  })

  return stockById || null
}

export {
  checkStockExistsService,
  createStockService,
  getAllStockService,
  deleteStockService,
  updateQuantityStockService,
  getStockBySellerService,
  getStockByFlavorProductService,
  getStockByIdService,
  createstockNewService,
}
