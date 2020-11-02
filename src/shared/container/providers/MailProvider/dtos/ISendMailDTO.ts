import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO'

interface MailContact {
  name: string
  email: string
}

interface ISendMailDTO {
  to: MailContact
  from?: MailContact
  subject: string
  templateData: IParseMailTemplateDTO
}

export default ISendMailDTO
