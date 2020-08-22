import { Router } from 'express'
import { parseISO } from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const routes = Router()

const repository = new AppointmentRepository([])

routes.get('/', (req, res) => {
  const appointments = repository.all()

  return res.json(appointments)
})

routes.post('/', (req, res) => {
  const { provider, date } = req.body
  const parsedDate = parseISO(date)

  try {
    const service = new CreateAppointmentService(repository)
    const appointment = service.execute({ provider, date: parsedDate })
    return res.json(appointment)
  } catch (err) {
    return res.status(400).json(err.message)
  }
})

export default routes
