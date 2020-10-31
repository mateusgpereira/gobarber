import IUserTokenRepository from '@modules/users/repositories/IUserTokensRepository'
import { Repository, getRepository } from 'typeorm'
import UserToken from '../entities/UserToken'

class UserTokensRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>

  constructor() {
    this.repository = getRepository(UserToken)
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.repository.findOne({ where: { token } })
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.repository.create({ user_id })
    await this.repository.save(userToken)

    return userToken
  }
}

export default UserTokensRepository
