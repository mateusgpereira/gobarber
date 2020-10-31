import ResetPasswordService from '@modules/users/services/ResetPasswordService'
import { Router } from 'express'

import ForgotPasswordController from '../controllers/ForgotPasswordController'
import ResetPasswordController from '../controllers/ResetPasswordController'

const routes = Router()

const forgotController = new ForgotPasswordController()
const resetController = new ResetPasswordController()

routes.post('/forgot', forgotController.create)
routes.post('/reset', resetController.create)

export default routes
