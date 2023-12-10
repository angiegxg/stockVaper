import { PrismaClient } from '@prisma/client'
import { Stock } from '../types'

const prisma = new PrismaClient()

async function createstockNewService(stock: Stock, userId: number): Promise<Stock> {
  const { productId, flavorId, quantity, sellerId } = stock
  const createStock = await prisma.stock.create({
    data: {
      userId,
      productId,
      flavorId,
      quantity,
      sellerId,
    },
  })

  return createStock
}

async function checkStockExistsService(productId: number, flavorId: number, sellerId: number, userId: number): Promise<Stock | null> {
  const existingStock = await prisma.stock.findFirst({
    where: { productId, flavorId, sellerId, userId },
    select: { id: true, productId: true, flavorId: true, sellerId: true, quantity: true, userId: true },
  })

  return existingStock || null
}

async function getStockBySellerService(sellerId: number, userId: number): Promise<Stock[] | null> {
  const sellerStock = await prisma.stock.findMany({
    where: { sellerId, userId },
    select: { id: true, productId: true, flavorId: true, sellerId: true, quantity: true, userId: true },
  })

  return sellerStock.length > 0 ? sellerStock : null
}

async function getStockByFlavorProductService(productId: number, flavorId: number): Promise<Stock[] | null> {
  const flavorProductStock = await prisma.stock.findMany({
    where: { productId, flavorId },
    select: { id: true, productId: true, flavorId: true, sellerId: true, quantity: true, userId: true },
  })

  return flavorProductStock.length > 0 ? flavorProductStock : null
}

async function getAllStockService(userId: number): Promise<Stock[] | null> {
  const flavorProductStock = await prisma.stock.findMany({
    where: { userId },
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

async function updateQuantityStockService(id: number, quantity: number, userId: number): Promise<Stock> {
  const updateStock = await prisma.stock.update({
    where: { id, userId },
    data: {
      quantity,
    },
  })

  console.log(updateStock)

  return updateStock
}

async function createStockService(stock: Stock, userId: number): Promise<Stock> {
  const { productId, flavorId, quantity, sellerId } = stock

  const existingStock = await checkStockExistsService(productId, flavorId, sellerId, userId)

  if (existingStock) {
    return await updateQuantityStockService(existingStock.id!, quantity, userId)
  } else {
    return await createstockNewService(stock, userId)
  }
}

async function deleteStockService(id: number, userId: number): Promise<Stock | null> {
  const deletedStock = await prisma.stock.delete({
    where: { id, userId },
  })

  return deletedStock
}

async function getStockByIdService(id: number, userId: number): Promise<Stock | null> {
  const stockById = await prisma.stock.findUnique({
    where: { id, userId },
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
