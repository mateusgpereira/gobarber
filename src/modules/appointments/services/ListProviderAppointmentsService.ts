import { injectable, inject } from 'tsyringe'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import { classToClass } from 'class-transformer'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import Appointment from '../infra/typeorm/entities/Appointment'

interface RequestData {
  provider_id: string
  year: number
  month: number
  day: number
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day
  }: RequestData): Promise<Appointment[]> {
    const cacheKey = `providers-appointments:${year}-${month}-${day}`

    let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey)

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          provider_id,
          year,
          month,
          day
        }
      )
      this.cacheProvider.save(cacheKey, classToClass(appointments))
    }

    return appointments
  }
}

export default ListProviderAppointmentsService
