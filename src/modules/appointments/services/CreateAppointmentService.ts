import { startOfHour } from 'date-fns'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import AppError from '@shared/errors/AppError'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface AppointmentRequestDTO {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  constructor(private repository: IAppointmentsRepository) {}

  public async execute({
    provider_id,
    date
  }: AppointmentRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const findAppoointmentSameDate = await this.repository.findByDate(
      appointmentDate
    )

    if (findAppoointmentSameDate) {
      throw new AppError('Appointment already booked')
    }

    const appointment = await this.repository.create({
      provider_id,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
