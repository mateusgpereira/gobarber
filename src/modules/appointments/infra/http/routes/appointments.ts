import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import auth from '@modules/users/infra/http/middlewares/auth'

const routes = Router()

routes.use(auth)

routes.get('/', async (req, res) => {
  const repository = getCustomRepository(AppointmentRepository)
  const appointments = await repository.find()

  return res.json(appointments)
})

routes.post('/', async (req, res) => {
  const { provider_id, date } = req.body
  const parsedDate = parseISO(date)

  const service = new CreateAppointmentService()
  const appointment = await service.execute({ provider_id, date: parsedDate })
  return res.json(appointment)
})

export default routes
