import { inject, injectable } from 'tsyringe'
import path from 'path'

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

interface RequestDTO {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository') private repository: IUsersRepository,
    @inject('MailProvider') private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private tokenRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: RequestDTO): Promise<void> {
    const user = await this.repository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists')
    }

    const { token } = await this.tokenRepository.generate(user.id)

    const templateFilePath = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[GoBarber] Password Recover',
      templateData: {
        file: templateFilePath,
        variables: {
          name: user.name,
          link: `${process.env.APP_BASE_URL}/reset_password?token=${token}`
        }
      }
    })
  }
}

export default SendForgotPasswordEmailService
