import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { isAfter, addHours } from 'date-fns'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface RequestDTO {
  token: string
  password: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository') private repository: IUsersRepository,
    @inject('UserTokensRepository')
    private tokenRepository: IUserTokensRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
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

    const limitDate = addHours(userToken.created_at, 2)
    if (isAfter(Date.now(), limitDate)) {
      throw new AppError('Token expired')
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.repository.save(user)
  }
}

export default ResetPasswordService
