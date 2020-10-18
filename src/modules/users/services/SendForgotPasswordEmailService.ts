import { inject, injectable } from 'tsyringe'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUserRepository'

interface RequestDTO {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository') private repository: IUsersRepository,
    @inject('MailProvider') private mailProvider: IMailProvider
  ) {}

  public async execute({ email }: RequestDTO): Promise<void> {
    const user = await this.repository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists')
    }

    this.mailProvider.sendMail(email, 'Password recover request received!')
  }
}

export default SendForgotPasswordEmailService
