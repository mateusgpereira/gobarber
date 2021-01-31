import { startOfHour, isBefore, getHours, format } from 'date-fns'
import { inject, injectable } from 'tsyringe'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import AppError from '@shared/errors/AppError'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface AppointmentRequestDTO {
  provider_id: string
  user_id: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private repository: IAppointmentsRepository,
    @inject('NotificationRepository')
    private notificationRepository: INotificationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    provider_id,
    user_id,
    date
  }: AppointmentRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment in a past date")
    }

    const findAppoointmentSameDate = await this.repository.findByDate(
      appointmentDate
    )

    if (findAppoointmentSameDate) {
      throw new AppError('Appointment already booked')
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can only create appointments between 8am and 5pm')
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself")
    }

    const appointment = await this.repository.create({
      provider_id,
      user_id,
      date: appointmentDate
    })

    this.cacheProvider.invalidate(
      `providers-appointments:${format(appointmentDate, 'yyyy-M-d')}`
    )

    const formattedData = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'hrs'")

    await this.notificationRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${formattedData}`
    })

    return appointment
  }
}

export default CreateAppointmentService
