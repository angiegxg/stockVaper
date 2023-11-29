import { PrismaClient, Flavor } from '@prisma/client'

const prisma = new PrismaClient()

async function createFlavorService(flavors: Flavor[]): Promise<Flavor[]> {
  const createdFlavors = await Promise.all(
    flavors.map(async (flavor) => {
      const flavorLoweCase = flavor.flavor.toLocaleLowerCase()
      const existingFlavor = await prisma.flavor.findMany({
        where: { flavor: flavorLoweCase },
      })

      if (existingFlavor.length > 0) {
        throw new Error(`El sabor '${flavorLoweCase}' ya existe.`)
      }

      return await prisma.flavor.create({
        data: { flavor: flavorLoweCase },
      })
    }),
  )

  return createdFlavors
}

async function getAllFlavorService(): Promise<Flavor[]> {
  const allflavor = await prisma.flavor.findMany()
  return allflavor
}

export { createFlavorService, getAllFlavorService }
