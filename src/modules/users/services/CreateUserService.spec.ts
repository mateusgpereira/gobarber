import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService'

describe('CreateUserService', () => {
  it('should be create a new user', async () => {
    const repository = new FakeUsersRepository()
    const service = new CreateUserService(repository)

    const user = await service.execute({
      name: 'mateus',
      email: 'mateus@firedev.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
    expect(user.email).toBe('mateus@firedev.com')
  })

  it('should not be able to create two users with same email', async () => {
    const repository = new FakeUsersRepository()
    const service = new CreateUserService(repository)

    await service.execute({
      name: 'mateus',
      email: 'mateus@firedev.com',
      password: '123456'
    })

    expect(
      service.execute({
        name: 'mateus',
        email: 'mateus@firedev.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
