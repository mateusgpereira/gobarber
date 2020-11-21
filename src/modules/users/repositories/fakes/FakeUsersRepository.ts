import { v4 } from 'uuid'
import IUserRepository from '@modules/users/repositories/IUsersRepository'
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

  public async findAllProviders(except_id_user: string): Promise<User[]> {
    let { users } = this

    if (except_id_user) {
      users = this.users.filter(user => user.id !== except_id_user)
    }

    return users
  }

  public async create(userDTO: ICreateUserDTO): Promise<User> {
    const id = v4()

    const user = new User()
    user.id = id
    Object.assign(user, userDTO)
    user.created_at = new Date()
    user.updated_at = new Date()
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
