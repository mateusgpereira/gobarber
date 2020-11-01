import { container } from 'tsyringe'

import IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiskProvider from './StorageProvider/implementations/DiskStorageProvider'

import IMailProvider from './MailProvider/models/IMailProvider'
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'

container.registerSingleton<IStorageProvider>('StorageProvider', DiskProvider)

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider()
)
