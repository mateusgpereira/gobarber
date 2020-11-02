import { Router } from 'express'

import ProfileController from '../controllers/ProfileController'
import auth from '../middlewares/auth'

const profileController = new ProfileController()

const routes = Router()
routes.use(auth)
routes.get('/', profileController.show)
routes.put('/', profileController.update)

export default routes
