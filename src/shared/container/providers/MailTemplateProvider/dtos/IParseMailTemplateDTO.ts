interface TemplateVariables {
  [key: string]: string | number
}

interface IParseMailTemplateDTO {
  template: string
  variables: TemplateVariables
}

export default IParseMailTemplateDTO
