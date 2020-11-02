interface TemplateVariables {
  [key: string]: string | number
}

interface IParseMailTemplateDTO {
  file: string
  variables: TemplateVariables
}

export default IParseMailTemplateDTO
