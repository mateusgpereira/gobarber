import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentsRepository'

interface AppointmentRequestDTO {
  provider: string
  date: Date
}

class CreateAppointmentService {
  public async execute({
    provider,
    date
  }: AppointmentRequestDTO): Promise<Appointment> {
    const repository = getCustomRepository(AppointmentRepository)
    const appointmentDate = startOfHour(date)

    const findAppoointmentSameDate = await repository.findByDate(
      appointmentDate
    )

    if (findAppoointmentSameDate) {
      throw Error('Appointment already booked')
    }

    const appointment = repository.create({
      provider,
      date: appointmentDate
    })

    await repository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
