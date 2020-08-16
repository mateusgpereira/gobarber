import { Router } from 'express'
import appointmentRouter from './appointments'

const routes = Router()

routes.use('/appointments', appointmentRouter)

export default routes
