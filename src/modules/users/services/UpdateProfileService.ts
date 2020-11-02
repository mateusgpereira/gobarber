import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUsersRepository from '../repositories/IUsersRepository'
import User from '../infra/typeorm/entities/User'

interface Request {
  user_id: string
  name: string
  email: string
  old_password?: string
  password?: string
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private repository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password
  }: Request): Promise<User> {
    const user = await this.repository.findById(user_id)

    if (!user) {
      throw new AppError('User not found.')
    }

    const userExists = await this.repository.findByEmail(email)
    if (userExists && userExists.id !== user_id) {
      throw new AppError('Email already in use.')
    }

    user.name = name
    user.email = email

    if (password && !old_password) {
      throw new AppError('The old password is required to set a new one')
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compare(
        old_password,
        user.password
      )

      if (!checkOldPassword) {
        throw new AppError('Old password does not match')
      }

      user.password = await this.hashProvider.generateHash(password)
    }

    return user
  }
}

export default UpdateProfileService
