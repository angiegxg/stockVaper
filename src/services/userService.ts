import { PrismaClient, User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
async function createUserService(user: User): Promise<User> {
  const { email, password } = user

  if (await checkUserService(user)) {
    throw new Error(`El usuario '${email}' ya existe.`)
  }

  const createUser = await prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, 10),
    },
  })

  return createUser
}

function createToken(user: User): string {
  const payload = { user_id: user.id, user_email: user.email }
  return jwt.sign(payload, 'tukivaper')
}

async function checkUserService(user: User): Promise<{ token: string; user: User } | null> {
  const { email, password } = user

  const storedUser = await prisma.user.findFirst({
    where: { email },
    include: {
      stocks: {
        include: {
          seller: true,
          product: {
            include: {
              product: true,
              flavor: true,
            },
          },
        },
      },
      distributions: {
        include: {
          sentFromStock: {
            include: {
              product: {
                include: {
                  product: true,
                  flavor: true,
                },
              },
              seller: true,
            },
          },
          receivedAtStock: {
            include: {
              product: {
                include: {
                  product: true,
                  flavor: true,
                },
              },
              seller: true,
            },
          },
        },
      },
      flavors: true,
      products: {
        include: {
          flavors: {
            include: {
              flavor: true,
            },
          },
        },
      },
      sellers: true,
      sales: {
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
      },
    },
  })

  if (storedUser && storedUser.password) {
    const isPasswordMatch = await bcrypt.compare(password, storedUser.password)

    if (isPasswordMatch) {
      const token = createToken(storedUser)
      return { token, user: storedUser }
    } else {
      throw new Error('Contraseña incorrecta')
    }
  }

  return null
}

async function getDataUserService(id: number): Promise<User | null> {
  const userdata = await prisma.user.findUnique({ where: { id } })
  return userdata || null
}

export { createUserService, checkUserService, getDataUserService }
