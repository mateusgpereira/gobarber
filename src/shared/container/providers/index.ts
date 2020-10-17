import { container } from 'tsyringe'

import IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiskProvider from './StorageProvider/implementations/DiskStorageProvider'

container.registerSingleton<IStorageProvider>('StorageProvider', DiskProvider)
