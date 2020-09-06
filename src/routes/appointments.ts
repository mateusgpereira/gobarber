import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppointmentRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import auth from '../middlewares/auth'

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
