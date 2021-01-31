import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import User from '../infra/typeorm/entities/User'
import IUserRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface UserDTO {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ name, email, password }: UserDTO): Promise<User> {
    const userExists = await this.repository.findByEmail(email)

    if (userExists) {
      throw new AppError('Email already used.')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = this.repository.create({
      name,
      email,
      password: hashedPassword
    })

    this.cacheProvider.invalidatePrefix('providers-list')

    return user
  }
}

export default CreateUserService
