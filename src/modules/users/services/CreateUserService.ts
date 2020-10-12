import { hash } from 'bcryptjs'
import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import IUserRepository from '../repositories/IUserRepository'

interface UserDTO {
  name: string
  email: string
  password: string
}

class CreateUserService {
  constructor(private repository: IUserRepository) {}

  public async execute({ name, email, password }: UserDTO): Promise<User> {
    const userExists = await this.repository.findByEmail(email)

    if (userExists) {
      throw new AppError('Email already used.')
    }

    const hashedPassword = await hash(password, 8)

    const user = this.repository.create({
      name,
      email,
      password: hashedPassword
    })

    return user
  }
}

export default CreateUserService
