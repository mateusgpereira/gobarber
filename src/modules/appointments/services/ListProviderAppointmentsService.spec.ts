import 'reflect-metadata'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

let service: ListProviderAppointmentsService
let repository: FakeAppointmentsRepository

describe('ListProviderAppointments', () => {
  const fakeCacheProvider = new FakeCacheProvider()
  beforeEach(() => {
    repository = new FakeAppointmentsRepository()
    service = new ListProviderAppointmentsService(repository, fakeCacheProvider)
  })

  it('should be able to list the appointments for a provider in a given day', async () => {
    const createdAppointments = await Promise.all([
      repository.create({
        provider_id: 'provider-id',
        user_id: 'user-id',
        date: new Date(2021, 0, 20, 14, 0, 0)
      }),
      repository.create({
        provider_id: 'provider-id',
        user_id: 'user-id',
        date: new Date(2021, 0, 20, 15, 0, 0)
      })
    ])

    const appointments = await service.execute({
      provider_id: 'provider-id',
      year: 2021,
      month: 1,
      day: 20
    })

    expect(appointments).toEqual(createdAppointments)
  })
})
