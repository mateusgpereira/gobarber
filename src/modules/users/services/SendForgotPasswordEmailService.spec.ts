import 'reflect-metadata'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import AppError from '@shared/errors/AppError'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'

let repository: FakeUsersRepository
let tokenRepository: FakeUserTokensRepository
let mailProvider: FakeMailProvider
let service: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    repository = new FakeUsersRepository()
    tokenRepository = new FakeUserTokensRepository()
    mailProvider = new FakeMailProvider()
    service = new SendForgotPasswordEmailService(
      repository,
      mailProvider,
      tokenRepository
    )
  })

  const name = 'Mateus'
  const email = 'mateus@firedev.com'
  const password = '123456'

  it('should be able to recover the password using the email', async () => {
    const sendMailSpy = jest.spyOn(mailProvider, 'sendMail')

    const user = await repository.create({
      name,
      email,
      password
    })

    await service.execute({ email: user.email })

    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to recover the password for a non-existent user', async () => {
    await expect(
      service.execute({ email: 'mateus@firedev.io' })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should generate a forgot password token', async () => {
    const generateSpy = jest.spyOn(tokenRepository, 'generate')

    const user = await repository.create({ name, email, password })

    await service.execute({ email: user.email })

    expect(generateSpy).toHaveBeenCalledWith(user.id)
  })
})
