import { container } from 'tsyringe'
import uploadConfig from '@config/upload'
import IStorageProvider from './models/IStorageProvider'
import DiskProvider from './implementations/DiskStorageProvider'
import S3Provider from './implementations/S3StorageProvider'

const providers = {
  disk: DiskProvider,
  s3: S3Provider
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver]
)
