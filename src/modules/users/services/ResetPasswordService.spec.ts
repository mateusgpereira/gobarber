import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import ResetPasswordService from './ResetPasswordService'

describe('ResetPasswordService', () => {
  const name = 'Mateus'
  const email = 'mateus@firedev.com'
  const password = '123456'

  it('should be able to reset password', async () => {
    const repository = new FakeUsersRepository()
    const tokenRepository = new FakeUserTokensRepository()
    const service = new ResetPasswordService(repository, tokenRepository)

    const user = await repository.create({ name, email, password })

    const { user_token: token } = await tokenRepository.generate(user.id)

    await service.execute({ token, password: '1234567' })

    const updatedUser = await repository.findById(user.id)

    expect(updatedUser?.password).toBe('1234567')
  })
})
