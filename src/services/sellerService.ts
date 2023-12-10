import { PrismaClient, Seller } from '@prisma/client'

const prisma = new PrismaClient()

async function createSellerService(seller: Seller): Promise<Seller> {
  const { name, commission, userId } = seller
  if (await ifSellerByNameService(name, userId)) {
    throw new Error(`El vendedor'${name}' ya existe.`)
  }
  const createSeller = await prisma.seller.create({
    data: {
      name,
      commission,
      userId,
    },
  })

  return createSeller
}

async function ifSellerByNameService(seller: string, userId: number): Promise<boolean> {
  const SellerByName = await prisma.seller.findFirst({
    where: { name: seller, userId },
    select: { id: true, name: true, commission: true },
  })

  if (SellerByName) {
    return true
  }

  return false
}

async function getAllSellerStockService(userId: number): Promise<Seller[]> {
  const sellerStock = await prisma.seller.findMany({
    where: { userId },
    include: {
      stock: {
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

  return sellerStock
}

async function getAllSellerStockByIDService(id: number, userId: number): Promise<Seller[]> {
  const sellerStock = await prisma.seller.findMany({
    where: { id, userId },
    include: {
      stock: {
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

  return sellerStock
}

async function deleteSellerService(id: number, userId: number): Promise<Seller> {
  const sellerDelete = await prisma.seller.delete({
    where: { id, userId },
  })

  return sellerDelete
}

export { createSellerService, ifSellerByNameService, getAllSellerStockService, deleteSellerService, getAllSellerStockByIDService }
