import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

let service: ListProviderDayAvailabilityService
let appointmentsRepository: IAppointmentsRepository

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository()
    service = new ListProviderDayAvailabilityService(appointmentsRepository)
  })

  it('should be able to list the day availability', async () => {
    await Promise.all([
      appointmentsRepository.create({
        provider_id: 'user',
        date: new Date(2020, 11, 10, 11, 0, 0)
      }),
      appointmentsRepository.create({
        provider_id: 'user',
        date: new Date(2020, 11, 10, 15, 0, 0)
      })
    ])

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 11).getTime()
    })

    const dayAvailability = await service.execute({
      provider_id: 'user',
      day: 10,
      month: 12,
      year: 2020
    })

    expect(dayAvailability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 14, available: true },
        { hour: 15, available: false },
        { hour: 17, available: true }
      ])
    )
  })
})
