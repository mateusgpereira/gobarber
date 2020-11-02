import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import AppError from '@shared/errors/AppError'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService'

let repository: FakeUserRepository
let storage: FakeStorageProvider
let service: UpdateUserAvatarService

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    repository = new FakeUserRepository()
    storage = new FakeStorageProvider()
    service = new UpdateUserAvatarService(repository, storage)
  })
  const avatar = 'avatar.jpg'
  const sampleUser = {
    name: 'Mateus',
    email: 'mateus@firedev.com',
    password: '123456'
  }

  it('should be able to update an user avatar', async () => {
    const user = await repository.create(sampleUser)

    await service.execute({ user_id: user.id, avatarFilename: avatar })

    expect(user.avatar).toBe(avatar)
  })

  it('should not update avatar of a non-existent user', async () => {
    await expect(
      service.execute({ user_id: 'invalid', avatarFilename: avatar })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old avatar when sending a new one', async () => {
    const deleteFileSpy = jest.spyOn(storage, 'deleteFile')

    const user = await repository.create(sampleUser)

    await service.execute({ user_id: user.id, avatarFilename: avatar })

    await service.execute({ user_id: user.id, avatarFilename: 'newAvatar' })

    expect(user.avatar).toBe('newAvatar')
    expect(deleteFileSpy).toHaveBeenCalledWith(avatar)
  })
})
