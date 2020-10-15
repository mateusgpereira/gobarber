import { v4 } from 'uuid'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import User from '../../infra/typeorm/entities/User'

class FakeUsersRepository implements IUserRepository {
  private users: User[] = []

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email)
    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id)
    return user
  }

  public async create(userDTO: ICreateUserDTO): Promise<User> {
    const id = v4()

    const user = new User()
    user.id = id
    Object.assign(user, userDTO)
    this.users.push(user)

    return user
  }

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex(userItem => userItem.id === user.id)

    this.users[index] = user
    return user
  }
}

export default FakeUsersRepository
