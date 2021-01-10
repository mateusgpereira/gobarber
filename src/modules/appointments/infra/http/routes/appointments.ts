import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import auth from '@modules/users/infra/http/middlewares/auth'

import AppointmentsController from '../controllers/AppointmentsController'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'

const routes = Router()
const appointmentsController = new AppointmentsController()
const providerApointmentsController = new ProviderAppointmentsController()

routes.use(auth)

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required()
    }
  }),
  appointmentsController.create
)
routes.get('/me', providerApointmentsController.index)

export default routes
