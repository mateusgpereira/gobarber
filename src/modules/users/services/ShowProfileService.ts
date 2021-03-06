import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUserRepository from '../repositories/IUsersRepository'
import User from '../infra/typeorm/entities/User'

interface Request {
  user_id: string
}

@injectable()
class ShowProfileService {
  constructor(@inject('UserRepository') private repository: IUserRepository) {}

  public async execute({ user_id }: Request): Promise<User> {
    const user = await this.repository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    delete user.password
    return user
  }
}

export default ShowProfileService
