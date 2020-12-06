import { Router } from 'express'

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

routes.get('/:id/month-availability', monthAvailabilityController.index)
routes.get('/:id/day-availability', dayAvailabilityController.index)

export default routes
