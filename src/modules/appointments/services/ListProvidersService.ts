import { inject, injectable } from 'tsyringe'
import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/IUsersRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface RequestData {
  except_user_id: string
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('CacheProvider') private cacheProvider: ICacheProvider
  ) {}

  public async execute({ except_user_id }: RequestData): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${except_user_id}`
    )

    if (!users) {
      users = await this.userRepository.findAllProviders(except_user_id)

      this.cacheProvider.save(`providers-list:${except_user_id}`, users)
    }
    return users
  }
}

export default ListProvidersService
