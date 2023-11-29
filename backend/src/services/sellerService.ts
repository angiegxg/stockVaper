import { PrismaClient, Seller } from '@prisma/client'

const prisma = new PrismaClient()

async function createSellerService(seller: Seller): Promise<Seller> {
  const { name, commission } = seller
  if (await ifSellerByNameService(name)) {
    throw new Error(`El vendedor'${name}' ya existe.`)
  }
  const createSeller = await prisma.seller.create({
    data: {
      name,
      commission,
    },
  })

  return createSeller
}

async function ifSellerByNameService(seller: string): Promise<boolean> {
  const SellerByName = await prisma.seller.findUnique({
    where: { name: seller },
    select: { id: true, name: true, commission: true },
  })

  if (SellerByName) {
    return true
  }

  return false
}

async function getAllSellerStockService(): Promise<Seller[]> {
  const sellerStock = await prisma.seller.findMany({
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

async function getAllSellerStockByIDService(id: number): Promise<Seller[]> {
  const sellerStock = await prisma.seller.findMany({
    where: { id },
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

async function deleteSellerService(id: number): Promise<Seller> {
  const sellerDelete = await prisma.seller.delete({
    where: { id },
  })

  return sellerDelete
}

export { createSellerService, ifSellerByNameService, getAllSellerStockService, deleteSellerService, getAllSellerStockByIDService }
