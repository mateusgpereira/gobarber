import { container } from 'tsyringe'
import IStorageProvider from './models/IStorageProvider'
import DiskProvider from './implementations/DiskStorageProvider'

const providers = {
  disk: DiskProvider
}

container.registerSingleton<IStorageProvider>('StorageProvider', providers.disk)
