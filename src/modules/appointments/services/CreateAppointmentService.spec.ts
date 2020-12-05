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
    const appointment = await service.execute({
      provider_id: '12341242',
      user_id: '10293847',
      date: new Date()
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('12341242')
  })

  it('should not be able to create 2 appointments for the same time', async () => {
    const appointmentDate = new Date(2020, 9, 14, 10)

    await service.execute({
      provider_id: '12341242',
      user_id: '10293847',
      date: appointmentDate
    })

    expect(
      service.execute({
        provider_id: '12341242',
        user_id: '10293847',
        date: appointmentDate
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
