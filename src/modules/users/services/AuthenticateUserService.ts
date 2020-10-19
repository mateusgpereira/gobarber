import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import authConfig from '@config/authConfig'
import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import IUserRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.repository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect Email or Password', 401)
    }

    const passwordMatched = await this.hashProvider.compare(
      password,
      user.password
    )
    if (!passwordMatched) {
      throw new AppError('Incorrect Email or Password', 401)
    }

    delete user.password

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, { subject: user.id, expiresIn })

    return { user, token }
  }
}

export default AuthenticateUserService
