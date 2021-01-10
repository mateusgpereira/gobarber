import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { celebrate, Joi, Segments } from 'celebrate'
import auth from '../middlewares/auth'
import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

const routes = Router()
const usersController = new UsersController()
const avatarController = new UserAvatarController()
const upload = multer(uploadConfig)

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  usersController.create
)

routes.patch('/avatar', auth, upload.single('avatar'), avatarController.update)

export default routes
