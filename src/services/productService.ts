import { PrismaClient, Product } from '@prisma/client'

const prisma = new PrismaClient()

async function createProductService(product: Product, flavorIds: number[], userId: number): Promise<Product> {
  const { name, description, img, cost } = product

  const createProduct = await prisma.product.create({
    data: {
      name,
      description,
      img,
      cost,
      userId,
      flavors: {
        create: flavorIds.map((flavorId) => ({
          flavor: {
            connect: { id: flavorId },
          },
        })),
      },
    },
    include: {},
  })
  return createProduct
}

async function getAllProductService(userId: number): Promise<Product[]> {
  const allproduct = await prisma.product.findMany({
    where: { userId },
  })
  return allproduct
}

export { createProductService, getAllProductService }
