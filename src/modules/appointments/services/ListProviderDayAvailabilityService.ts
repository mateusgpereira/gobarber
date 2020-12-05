import { getHours, isAfter } from 'date-fns'
import { inject, injectable } from 'tsyringe'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface RequestData {
  provider_id: string
  day: number
  month: number
  year: number
}

type Response = Array<{
  hour: number
  available: boolean
}>

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute(data: RequestData): Promise<Response> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      data
    )

    const hourStart = 8

    const hours = Array.from({ length: 10 }, (_, index) => index + hourStart)

    const currentDateTime = new Date(Date.now())
    const { year, month, day } = data

    const availability = hours.map(hour => {
      const hourAvailability = appointments.find(appointment => {
        return getHours(appointment.date) === hour
      })

      const compareDateTime = new Date(year, month - 1, day, hour)

      return {
        hour,
        available:
          !hourAvailability && isAfter(compareDateTime, currentDateTime)
      }
    })

    return availability
  }
}

export default ListProviderDayAvailabilityService
