import { inject, injectable } from 'tsyringe'
import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/IUsersRepository'

interface RequestData {
  except_user_id: string
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  public async execute({ except_user_id }: RequestData): Promise<User[]> {
    return this.userRepository.findAllProviders(except_user_id)
  }
}

export default ListProvidersService
