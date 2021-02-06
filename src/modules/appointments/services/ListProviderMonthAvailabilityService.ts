import { injectable, inject } from 'tsyringe'
import { getDaysInMonth, getDate, isAfter } from 'date-fns'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface RequestData {
  provider_id: string
  month: number
  year: number
}

type Response = Array<{
  day: number
  available: boolean
}>

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    month,
    year
  }: RequestData): Promise<Response> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      { provider_id, month, year }
    )
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))

    const daysInMonth = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    )

    const availability = daysInMonth.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59)
      const dayAppointments = appointments.filter(appointment => {
        return getDate(appointment.date) === day
      })

      return {
        day,
        available:
          isAfter(compareDate, new Date()) && dayAppointments.length < 10
      }
    })

    return availability
  }
}

export default ListProviderMonthAvailabilityService
