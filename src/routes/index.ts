import { Router } from 'express'
import appointmentRouter from './appointments'
import userRouter from './users'
import sessionRouter from './sessions'

const routes = Router()

routes.use('/appointments', appointmentRouter)
routes.use('/users', userRouter)
routes.use('/sessions', sessionRouter)

export default routes
