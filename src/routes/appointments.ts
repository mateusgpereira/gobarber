import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppointmentRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const routes = Router()

routes.get('/', async (req, res) => {
  const repository = getCustomRepository(AppointmentRepository)
  const appointments = await repository.find()

  return res.json(appointments)
})

routes.post('/', async (req, res) => {
  const { provider_id, date } = req.body
  const parsedDate = parseISO(date)

  try {
    const service = new CreateAppointmentService()
    const appointment = await service.execute({ provider_id, date: parsedDate })
    return res.json(appointment)
  } catch (err) {
    return res.status(400).json(err.message)
  }
})

export default routes
