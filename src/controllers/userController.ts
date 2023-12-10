import { Request, Response } from 'express'
import { createUserService, checkUserService } from '../services/userService'

async function createUserController(req: Request, res: Response): Promise<void> {
  try {
    const user = req.body
    const createdUser = await createUserService(user)
    res.status(201).json(createdUser)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

async function checkUserController(req: Request, res: Response): Promise<void> {
  try {
    const user = req.body // Asume que los datos del usuario se encuentran en el cuerpo de la solicitud
    const userExists = await checkUserService(user)
    res.status(200).json({ exists: userExists })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// async function dataUserController(req: Request, res: Response): Promise<void> {
//   try {
//     const dataUser = await checkUserService(user)
//     res.status(200).json({ exists: userExists })
//   } catch (error: any) {
//     res.status(400).json({ error: error.message })
//   }
// }

export { createUserController, checkUserController }
