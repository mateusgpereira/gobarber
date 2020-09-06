import { getRepository } from 'typeorm'
import fs from 'fs'
import path from 'path'
import { tmpFolder } from '../config/upload'
import User from '../models/User'
import AppError from '../errors/AppError'

interface Request {
  user_id: string
  avatarFilename: string
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const repository = getRepository(User)
    const user = await repository.findOne(user_id)

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
    await repository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
