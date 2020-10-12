import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import auth from '../middlewares/auth'
import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

const routes = Router()
const usersController = new UsersController()
const avatarController = new UserAvatarController()
const upload = multer(uploadConfig)

routes.post('/', usersController.create)

routes.patch('/avatar', auth, upload.single('avatar'), avatarController.update)

export default routes
