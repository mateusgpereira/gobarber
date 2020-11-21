import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import IUserRepository from '@modules/users/repositories/IUsersRepository'
import ListProvidersService from './ListProvidersService'

let userRepository: IUserRepository
let service: ListProvidersService

describe('ListProviders', () => {
  beforeEach(() => {
    userRepository = new FakeUsersRepository()
    service = new ListProvidersService(userRepository)
  })

  it('should be able to list all the providers', async () => {
    const userOne = await userRepository.create({
      name: 'Mateus',
      email: 'mateus@fire.com',
      password: '123456'
    })

    const userTwo = await userRepository.create({
      name: 'Milico',
      email: 'milico@fire.com',
      password: '123456'
    })

    const loggedUser = await userRepository.create({
      name: 'Gui',
      email: 'gui@fire.com',
      password: '123456'
    })

    const providers = await service.execute({ except_user_id: loggedUser.id })

    expect(providers).toEqual([userOne, userTwo])
  })
})
