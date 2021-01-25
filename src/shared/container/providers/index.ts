import { container } from 'tsyringe'
import mailConfig from '@config/mail'

import IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiskProvider from './StorageProvider/implementations/DiskStorageProvider'

import IMailProvider from './MailProvider/models/IMailProvider'
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'
import SESMailProvider from './MailProvider/implementations/SESMailProvider'

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider'
import HbsMailTemplateProvider from './MailTemplateProvider/implementations/HbsMailTemplateProvider'

container.registerSingleton<IStorageProvider>('StorageProvider', DiskProvider)

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HbsMailTemplateProvider
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider)
)
