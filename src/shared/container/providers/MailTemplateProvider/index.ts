import { container } from 'tsyringe'
import IMailTemplateProvider from './models/IMailTemplateProvider'
import HbsMailTemplateProvider from './implementations/HbsMailTemplateProvider'

const providers = {
  hbs: HbsMailTemplateProvider
}

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.hbs
)
