import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentsRepository'
import AppError from '../errors/AppError'

interface AppointmentRequestDTO {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  public async execute({
    provider_id,
    date
  }: AppointmentRequestDTO): Promise<Appointment> {
    const repository = getCustomRepository(AppointmentRepository)
    const appointmentDate = startOfHour(date)

    const findAppoointmentSameDate = await repository.findByDate(
      appointmentDate
    )

    if (findAppoointmentSameDate) {
      throw new AppError('Appointment already booked')
    }

    const appointment = repository.create({
      provider_id,
      date: appointmentDate
    })

    await repository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
