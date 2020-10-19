import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import User from '../infra/typeorm/entities/User'
import IUserRepository from '../repositories/IUsersRepository'

interface Request {
  user_id: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this.repository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can update avatar', 401)
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    user.avatar = await this.storageProvider.saveFile(avatarFilename)
    await this.repository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
