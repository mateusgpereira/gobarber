import { startOfHour } from 'date-fns'

import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentsRepository'

interface AppointmentRequestDTO {
  provider: string
  date: Date
}

class CreateAppointmentService {
  private repository: AppointmentRepository

  public constructor(repository: AppointmentRepository) {
    this.repository = repository
  }

  public execute({ provider, date }: AppointmentRequestDTO): Appointment {
    const appointmentDate = startOfHour(date)

    const findAppoointmentSameDate = this.repository.findByDate(appointmentDate)

    if (findAppoointmentSameDate) {
      throw Error('Appointment already booked')
    }

    const appointment = this.repository.create({
      provider,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
