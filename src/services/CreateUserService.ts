import { hash } from 'bcryptjs'
import { getRepository } from 'typeorm'
import User from '../models/User'
import AppError from '../errors/AppError'

interface UserDTO {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: UserDTO): Promise<User> {
    const repository = getRepository(User)

    const userExists = await repository.findOne({
      where: { email }
    })

    if (userExists) {
      throw new AppError('Email already used.')
    }

    const hashedPassword = await hash(password, 8)

    const user = repository.create({ name, email, password: hashedPassword })

    await repository.save(user)

    return user
  }
}

export default CreateUserService
