import { PrismaClient, Flavor } from '@prisma/client'

const prisma = new PrismaClient()

async function createFlavorService(flavors: Flavor[], userId: number): Promise<Flavor[]> {
  const createdFlavors = await Promise.all(
    flavors.map(async (flavor) => {
      const flavorLoweCase = flavor.flavor.toLocaleLowerCase()
      const existingFlavor = await prisma.flavor.findMany({
        where: { flavor: flavorLoweCase, userId },
      })

      if (existingFlavor.length > 0) {
        throw new Error(`El sabor '${flavorLoweCase}' ya existe.`)
      }

      return await prisma.flavor.create({
        data: { flavor: flavorLoweCase, userId },
      })
    }),
  )

  return createdFlavors
}

async function getAllFlavorService(userId: number): Promise<Flavor[]> {
  const allflavor = await prisma.flavor.findMany({
    where: { userId },
  })
  return allflavor
}

export { createFlavorService, getAllFlavorService }
