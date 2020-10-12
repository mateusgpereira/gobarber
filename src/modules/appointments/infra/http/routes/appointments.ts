import { Router } from 'express'
import { parseISO } from 'date-fns'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import auth from '@modules/users/infra/http/middlewares/auth'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

const routes = Router()

routes.use(auth)

// routes.get('/', async (req, res) => {
//   const appointments = await repository.find()

//   return res.json(appointments)
// })

routes.post('/', async (req, res) => {
  const { provider_id, date } = req.body
  const parsedDate = parseISO(date)
  const repository = new AppointmentsRepository()

  const service = new CreateAppointmentService(repository)
  const appointment = await service.execute({ provider_id, date: parsedDate })
  return res.json(appointment)
})

export default routes
