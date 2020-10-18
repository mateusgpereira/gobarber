import UserToken from '../../infra/typeorm/entities/UserToken'
import IUserTokensRepository from '../IUserTokensRepository'

class FakeUserTokensRepository implements IUserTokensRepository {
  private usersTokens: UserToken[] = []

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken()

    userToken.user_id = user_id

    this.usersTokens.push(userToken)

    return userToken
  }
}

export default FakeUserTokensRepository
