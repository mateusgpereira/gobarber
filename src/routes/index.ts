import { Router } from 'express'
import appointmentRouter from './appointments'
import userRouter from './users'

const routes = Router()

routes.use('/appointments', appointmentRouter)
routes.use('/users', userRouter)

export default routes
