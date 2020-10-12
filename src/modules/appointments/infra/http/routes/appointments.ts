import { Router } from 'express'
import auth from '@modules/users/infra/http/middlewares/auth'

import AppointmentsController from '../controllers/AppointmentsController'

const routes = Router()
const appointmentsController = new AppointmentsController()

routes.use(auth)

routes.post('/', appointmentsController.create)

export default routes
