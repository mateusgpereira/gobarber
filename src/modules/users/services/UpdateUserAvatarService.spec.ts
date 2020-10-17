import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import AppError from '@shared/errors/AppError'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService'

describe('UpdateUserAvatar', () => {
  const avatar = 'avatar.jpg'
  const sampleUser = {
    name: 'Mateus',
    email: 'mateus@firedev.com',
    password: '123456'
  }

  it('should be able to update an user avatar', async () => {
    const repository = new FakeUserRepository()
    const storage = new FakeStorageProvider()
    const service = new UpdateUserAvatarService(repository, storage)

    const user = await repository.create(sampleUser)

    await service.execute({ user_id: user.id, avatarFilename: avatar })

    expect(user.avatar).toBe(avatar)
  })

  it('should not update avatar of a non-existent user', () => {
    const repository = new FakeUserRepository()
    const storage = new FakeStorageProvider()
    const service = new UpdateUserAvatarService(repository, storage)

    expect(
      service.execute({ user_id: 'invalid', avatarFilename: avatar })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old avatar when sending a new one', async () => {
    const repository = new FakeUserRepository()
    const storage = new FakeStorageProvider()
    const service = new UpdateUserAvatarService(repository, storage)
    const deleteFileSpy = jest.spyOn(storage, 'deleteFile')

    const user = await repository.create(sampleUser)

    await service.execute({ user_id: user.id, avatarFilename: avatar })

    await service.execute({ user_id: user.id, avatarFilename: 'newAvatar' })

    expect(user.avatar).toBe('newAvatar')
    expect(deleteFileSpy).toHaveBeenCalledWith(avatar)
  })
})
