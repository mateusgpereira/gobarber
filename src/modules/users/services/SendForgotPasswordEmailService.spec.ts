import 'reflect-metadata'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import AppError from '@shared/errors/AppError'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

let repository: FakeUsersRepository
let mailProvider: FakeMailProvider
let service: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    repository = new FakeUsersRepository()
    mailProvider = new FakeMailProvider()
    service = new SendForgotPasswordEmailService(repository, mailProvider)
  })

  it('should be able to recover the password using the email', async () => {
    const sendMailSpy = jest.spyOn(mailProvider, 'sendMail')

    const user = await repository.create({
      name: 'Mateus',
      email: 'mateus@firedev.com',
      password: '123456'
    })

    await service.execute({ email: user.email })

    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to recover the password for a non-existent user', async () => {
    await expect(
      service.execute({ email: 'mateus@firedev.io' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
