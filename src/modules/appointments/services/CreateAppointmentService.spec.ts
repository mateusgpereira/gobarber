import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import CreateAppointmentService from './CreateAppointmentService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

let fakeRepository: FakeAppointmentsRepository
let service: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeRepository = new FakeAppointmentsRepository()
    service = new CreateAppointmentService(fakeRepository)
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 10, 10, 12).getTime()
    })

    const appointment = await service.execute({
      provider_id: '12341242',
      user_id: '10293847',
      date: new Date(2020, 10, 12, 13)
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('12341242')
  })

  it('should not be able to create 2 appointments for the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 10, 10, 12).getTime()
    })
    const appointmentDate = new Date(2020, 10, 11, 15)

    await service.execute({
      provider_id: '12341242',
      user_id: '10293847',
      date: appointmentDate
    })

    await expect(
      service.execute({
        provider_id: '12341242',
        user_id: '10293847',
        date: appointmentDate
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment in a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 10, 10, 12).getTime()
    })

    await expect(
      service.execute({
        provider_id: '12341242',
        user_id: '10293847',
        date: new Date(2020, 10, 10, 11)
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment out of 8am and 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 10, 30, 12).getTime()
    })
    await expect(
      service.execute({
        user_id: 'user-id',
        provider_id: 'provider-id',
        date: new Date(2020, 11, 1, 7)
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      service.execute({
        user_id: 'user-id',
        provider_id: 'provider-id',
        date: new Date(2020, 11, 1, 19)
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
