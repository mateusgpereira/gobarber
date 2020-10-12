import { Repository, getRepository } from 'typeorm'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import User from '../entities/User'

class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { email } })
    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id)
    return user
  }

  public async create(userDTO: ICreateUserDTO): Promise<User> {
    const user = await this.repository.create(userDTO)

    await this.repository.save(user)

    return user
  }

  public async save(user: User): Promise<User> {
    const userUpdated = await this.repository.save(user)
    return userUpdated
  }
}

export default UserRepository
