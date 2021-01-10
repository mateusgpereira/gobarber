import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import auth from '@modules/users/infra/http/middlewares/auth'
import ProvidersController from '../controllers/ProvidersController'
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'

const providersController = new ProvidersController()
const monthAvailabilityController = new ProviderMonthAvailabilityController()
const dayAvailabilityController = new ProviderDayAvailabilityController()

const routes = Router()
routes.use(auth)

routes.get('/', providersController.index)

routes.get(
  '/:id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  monthAvailabilityController.index
)
routes.get(
  '/:id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  dayAvailabilityController.index
)

export default routes
