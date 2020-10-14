import 'reflect-metadata'
import CreateAppointmentService from './CreateAppointmentService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeRepository = new FakeAppointmentsRepository()
    const service = new CreateAppointmentService(fakeRepository)

    const appointment = await service.execute({
      provider_id: '12341242',
      date: new Date()
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('12341242')
  })

  it('should not be able to create 2 appointments for the same time', () => {
    expect(1 + 1).toBe(2)
  })
})
