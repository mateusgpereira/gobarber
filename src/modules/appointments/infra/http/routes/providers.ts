import { Router } from 'express'

import auth from '@modules/users/infra/http/middlewares/auth'
import ProvidersController from '../controllers/ProvidersController'

const providersController = new ProvidersController()

const routes = Router()
routes.use(auth)

routes.get('/', providersController.index)

export default routes
