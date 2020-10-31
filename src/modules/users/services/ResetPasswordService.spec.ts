import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import ResetPasswordService from './ResetPasswordService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

describe('ResetPasswordService', () => {
  let repository: FakeUsersRepository
  let tokenRepository: FakeUserTokensRepository
  let resetPasswordService: ResetPasswordService
  let hashProvider: FakeHashProvider

  beforeEach(() => {
    repository = new FakeUsersRepository()
    tokenRepository = new FakeUserTokensRepository()
    hashProvider = new FakeHashProvider()
    resetPasswordService = new ResetPasswordService(
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

    await resetPasswordService.execute({ token, password: newPassword })

    const updatedUser = await repository.findById(user.id)

    expect(generateHashSpy).toHaveBeenCalledWith(newPassword)
    expect(updatedUser?.password).toBe(newPassword)
  })

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: '',
        password: '1234567'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset a password for a non existent user', async () => {
    const { user_token } = await tokenRepository.generate('anonymous')
    await expect(
      resetPasswordService.execute({
        token: user_token,
        password: '1234567'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
