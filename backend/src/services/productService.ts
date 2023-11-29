import { PrismaClient, Product } from '@prisma/client'

const prisma = new PrismaClient()

async function createProductService(product: Product, flavorIds: number[]): Promise<Product> {
  const { name, description, img, cost } = product

  const createProduct = await prisma.product.create({
    data: {
      name,
      description,
      img,
      cost,
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

async function getAllProductService(): Promise<Product[]> {
  const allproduct = await prisma.product.findMany({})
  return allproduct
}

export { createProductService, getAllProductService }
