import { Router } from 'express'
import { startOfHour, parseISO } from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentsRepository'

const routes = Router()

const repository = new AppointmentRepository([])

routes.post('/', (req, res) => {
  const { provider, date } = req.body
  const parsedDate = startOfHour(parseISO(date))

  const findAppoointmentSameDate = repository.findByDate(parsedDate)

  if (findAppoointmentSameDate) {
    return res.status(400).json({ message: 'Appointment already booked' })
  }

  const appointment = repository.create(provider, parsedDate)

  return res.json(appointment)
})
export default routes
