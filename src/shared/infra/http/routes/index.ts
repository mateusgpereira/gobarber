import { Router } from 'express'
import appointmentRouter from '@modules/appointments/infra/http/routes/appointments'
import userRouter from '@modules/users/infra/http/routes/users'
import sessionRouter from '@modules/users/infra/http/routes/sessions'

const routes = Router()

routes.use('/appointments', appointmentRouter)
routes.use('/users', userRouter)
routes.use('/sessions', sessionRouter)

export default routes
