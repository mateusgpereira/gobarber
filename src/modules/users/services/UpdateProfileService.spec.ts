import AppError from '@shared/errors/AppError'

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import UpdateProfileService from './UpdateProfileService'

let hashProvider: IHashProvider
let repository: IUsersRepository
let updateProfileService: UpdateProfileService

describe('UpdateProfileService', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider()
    repository = new FakeUsersRepository()
    updateProfileService = new UpdateProfileService(repository, hashProvider)
  })

  it('should be able to update the user profile', async () => {
    const user = await repository.create({
      name: 'Mateus',
      email: 'mateus@firedev.com.br',
      password: '123456'
    })

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Anonymous',
      email: 'anonymous@firedev.com.br'
    })

    expect(updatedUser.name).toBe('Anonymous')
    expect(updatedUser.email).toBe('anonymous@firedev.com.br')
  })

  it('should not be able to change the email for an email that it is already registered', async () => {
    await repository.create({
      name: 'Mateus',
      email: 'mateus@firedev.com.br',
      password: '123456'
    })

    const user = await repository.create({
      name: 'Anonymous',
      email: 'anonymous@firedev.com.br',
      password: '123456'
    })

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Anonymous',
        email: 'mateus@firedev.com.br'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const user = await repository.create({
      name: 'Anonymous',
      email: 'anonymous@firedev.com.br',
      password: '123456'
    })

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: user.name,
      email: user.email,
      password: '123123',
      old_password: '123456'
    })

    expect(updatedUser.password).toBe('123123')
  })

  it('should not be able to update the password without the old password', async () => {
    const user = await repository.create({
      name: 'Anonymous',
      email: 'anonymous@firedev.com.br',
      password: '123456'
    })

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: user.name,
        email: user.email,
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
