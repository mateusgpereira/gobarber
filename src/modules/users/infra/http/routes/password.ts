import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import ForgotPasswordController from '../controllers/ForgotPasswordController'
import ResetPasswordController from '../controllers/ResetPasswordController'

const routes = Router()

const forgotController = new ForgotPasswordController()
const resetController = new ResetPasswordController()

routes.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required()
    }
  }),
  forgotController.create
)
routes.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password'))
    }
  }),
  resetController.create
)

export default routes
