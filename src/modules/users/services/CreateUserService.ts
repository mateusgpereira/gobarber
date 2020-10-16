import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import IUserRepository from '../repositories/IUserRepository'
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
    private hashProvider: IHashProvider
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

    return user
  }
}

export default CreateUserService
