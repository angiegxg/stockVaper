import { PrismaClient } from '@prisma/client'
import { Sale } from '../types'
import * as stockServise from './stockService'
const prisma = new PrismaClient()

async function createSaleService(sale: Sale): Promise<Sale> {
  const { sellerId, productsSold, total } = sale

  let newQuantity: number
  for (const product of productsSold) {
    const stock = await stockServise.checkStockExistsService(product.productId, product.flavorId, sellerId)

    if (stock!.quantity >= product.quantity) {
      newQuantity = stock!.quantity - product.quantity
    } else if (stock?.quantity) {
      // Ajustar la cantidad vendida al stock disponible
      newQuantity = stock.quantity
    }

    await stockServise.updateQuantityStockService(stock!.id!, newQuantity!)
  }

  const newSale = await prisma.sale.create({
    data: {
      date: new Date(),
      sellerId,
      total,
      productsSold: {
        create: productsSold.map((product) => ({
          quantity: newQuantity,
          productId: product.productId,
          flavorId: product.flavorId,
          price: product.price,
          saleId: product.saleId,
        })),
      },
    },
    include: {
      productsSold: true,
    },
  })

  return newSale
}

async function getAllSaleService(): Promise<Sale[]> {
  const sales = await prisma.sale.findMany({
    include: {
      seller: true,
      productsSold: {
        include: {
          product: {
            include: {
              product: true,
              flavor: true,
            },
          },
        },
      },
    },
  })

  return sales
}

async function goBackSaleService(id: number): Promise<Sale | null> {
  const sale = await prisma.sale.findUnique({
    where: { id },
    include: { productsSold: true },
  })

  if (!sale) {
    return null
  }

  for (const product of sale.productsSold) {
    const stock = await stockServise.checkStockExistsService(product.productId, product.flavorId, sale.sellerId)
    const newQuantity = stock!.quantity + product.quantity
    await stockServise.updateQuantityStockService(stock!.id!, newQuantity)
    await prisma.productDetail.delete({
      where: { id: product.id },
    })
  }

  await prisma.sale.delete({
    where: { id },
  })

  return sale
}

export { createSaleService, goBackSaleService, getAllSaleService }
