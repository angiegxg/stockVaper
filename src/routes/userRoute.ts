import express from 'express'
import * as userController from '../controllers/userController'

const userRoutes = express.Router()

userRoutes.post('/', userController.createUserController)
userRoutes.post('/login', userController.checkUserController)

export default userRoutes
