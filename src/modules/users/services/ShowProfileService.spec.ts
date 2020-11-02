import AppError from '@shared/errors/AppError'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import ShowProfileService from './ShowProfileService'
import IUsersRepository from '../repositories/IUsersRepository'

let repository: IUsersRepository
let showProfile: ShowProfileService

describe('ShowProfileService', () => {
  beforeEach(() => {
    repository = new FakeUserRepository()
    showProfile = new ShowProfileService(repository)
  })

  it('should be able to list the usr profile', async () => {
    const user = await repository.create({
      name: 'Mateus',
      email: 'mateus@firedev.com.br',
      password: '123456'
    })

    const profile = await showProfile.execute({ user_id: user.id })

    expect(profile.name).toBe('Mateus')
    expect(profile.email).toBe('mateus@firedev.com.br')
  })

  it('should not be able to list a profile for a non-existent user', async () => {
    await expect(
      showProfile.execute({ user_id: 'non-existent-user-id' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
