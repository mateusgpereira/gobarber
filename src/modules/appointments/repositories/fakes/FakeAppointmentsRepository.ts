import { v4 } from 'uuid'
import { isEqual, getMonth, getYear, getDate } from 'date-fns'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDateAndProvider(
    date: Date,
    provider_id: string
  ): Promise<Appointment | undefined> {
    const foundAppointment = this.appointments.find(appointment => {
      return (
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id
      )
    })

    return foundAppointment
  }

  public async findAllInMonthFromProvider({
    year,
    month,
    provider_id
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      )
    })

    return appointments
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      )
    })

    return appointments
  }

  public async create({
    provider_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    appointment.id = v4()
    appointment.date = date
    appointment.provider_id = provider_id

    this.appointments.push(appointment)
    return appointment
  }
}

export default FakeAppointmentsRepository
