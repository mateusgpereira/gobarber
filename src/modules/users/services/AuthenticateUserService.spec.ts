import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

describe('AuthenticateUserService', () => {
  const hashProvider = new FakeHashProvider()

  it('should be able to authenticate with email and password', async () => {
    const repository = new FakeUsersRepository()
    const authService = new AuthenticateUserService(repository, hashProvider)
    const createUserService = new CreateUserService(repository, hashProvider)

    const email = 'mateus@fire.com'
    const password = '123456'

    const user = await createUserService.execute({
      name: 'mateus',
      email,
      password
    })

    const response = await authService.execute({ email, password })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not be able to authenticate with a non-existent user', async () => {
    const repository = new FakeUsersRepository()
    const authService = new AuthenticateUserService(repository, hashProvider)

    expect(
      authService.execute({ email: 'usguri@test.com', password: 'senhazinha' })
    ).rejects.toBeInstanceOf(AppError)
  })

  test('should not be able to authenticate with wrong credentials', async () => {
    const repository = new FakeUsersRepository()
    const createUserService = new CreateUserService(repository, hashProvider)
    const authService = new AuthenticateUserService(repository, hashProvider)

    const email = 'mateus@fire.com'

    await createUserService.execute({
      name: 'Mateus',
      email,
      password: '123456'
    })

    expect(
      authService.execute({ email, password: 'wrong-pass' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
