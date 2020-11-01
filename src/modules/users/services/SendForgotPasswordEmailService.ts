import { inject, injectable } from 'tsyringe'
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

    await this.mailProvider.sendMail(
      email,
      `Password recover request received. Here is your token: ${token}`
    )
  }
}

export default SendForgotPasswordEmailService
