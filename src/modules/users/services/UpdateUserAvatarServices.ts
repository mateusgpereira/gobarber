import fs from 'fs'
import path from 'path'
import { inject, injectable } from 'tsyringe'
import { tmpFolder } from '@config/upload'
import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import IUserRepository from '../repositories/IUserRepository'

interface Request {
  user_id: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository
  ) {}

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this.repository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can update avatar', 401)
    }

    if (user.avatar) {
      const oldAvatarPath = path.join(tmpFolder, user.avatar)
      const fileExists = await fs.promises.stat(oldAvatarPath)

      if (fileExists) {
        fs.promises.unlink(oldAvatarPath)
      }
    }

    user.avatar = avatarFilename
    await this.repository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
