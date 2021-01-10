import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import ProfileController from '../controllers/ProfileController'
import auth from '../middlewares/auth'

const profileController = new ProfileController()

const routes = Router()
routes.use(auth)
routes.get('/', profileController.show)
routes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password'))
    }
  }),
  profileController.update
)

export default routes
