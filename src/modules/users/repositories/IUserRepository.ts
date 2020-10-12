import User from '@modules/users/infra/typeorm/entities/User'
import ICreateUserDTO from '../dtos/ICreateUserDTO'

interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
  create(userDto: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}

export default IUserRepository
