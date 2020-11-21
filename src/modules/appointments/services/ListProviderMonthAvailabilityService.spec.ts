import 'reflect-metadata'
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

let service: ListProviderMonthAvailabilityService
let appointmentRepository: FakeAppointmentsRepository

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    appointmentRepository = new FakeAppointmentsRepository()
    service = new ListProviderMonthAvailabilityService(appointmentRepository)
  })

  it('should be able to to list the month availability for a given provider', async () => {
    await Promise.all([
      appointmentRepository.create({
        provider_id: 'user',
        date: new Date(2020, 10, 20, 8, 0, 0)
      }),
      appointmentRepository.create({
        provider_id: 'user',
        date: new Date(2020, 11, 20, 8, 0, 0)
      }),
      appointmentRepository.create({
        provider_id: 'user',
        date: new Date(2020, 11, 20, 10, 0, 0)
      }),
      appointmentRepository.create({
        provider_id: 'user',
        date: new Date(2020, 11, 21, 15, 0, 0)
      })
    ])

    const providerAvailability = await service.execute({
      provider_id: 'user',
      month: 12,
      year: 2020
    })

    expect(providerAvailability).toEqual(
      expect.arrayContaining([
        { day: 19, availability: true },
        { day: 20, availability: false },
        { day: 21, availability: false },
        { day: 22, availability: true }
      ])
    )
  })
})
