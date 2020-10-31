import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import ResetPasswordService from './ResetPasswordService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

describe('ResetPasswordService', () => {
  let repository: FakeUsersRepository
  let tokenRepository: FakeUserTokensRepository
  let service: ResetPasswordService
  let hashProvider: FakeHashProvider

  beforeEach(() => {
    repository = new FakeUsersRepository()
    tokenRepository = new FakeUserTokensRepository()
    hashProvider = new FakeHashProvider()
    service = new ResetPasswordService(
      repository,
      tokenRepository,
      hashProvider
    )
  })

  const name = 'Mateus'
  const email = 'mateus@firedev.com'
  const password = '123456'

  it('should be able to reset password', async () => {
    const user = await repository.create({ name, email, password })
    const generateHashSpy = jest.spyOn(hashProvider, 'generateHash')

    const { user_token: token } = await tokenRepository.generate(user.id)
    const newPassword = '1234567'

    await service.execute({ token, password: newPassword })

    const updatedUser = await repository.findById(user.id)

    expect(generateHashSpy).toHaveBeenCalledWith(newPassword)
    expect(updatedUser?.password).toBe(newPassword)
  })
})
