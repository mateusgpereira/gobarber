import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

interface RequestDTO {
  token: string
  password: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository') private repository: IUsersRepository,
    @inject('UserTokensRepository')
    private tokenRepository: IUserTokensRepository
  ) {}

  public async execute({ token, password }: RequestDTO): Promise<void> {
    const userToken = await this.tokenRepository.findByToken(token)
    if (!userToken) {
      throw new AppError('Token does not exists')
    }

    const user = await this.repository.findById(userToken.user_id)
    if (!user) {
      throw new AppError('User does not exists')
    }

    user.password = password

    await this.repository.save(user)
  }
}

export default ResetPasswordService
