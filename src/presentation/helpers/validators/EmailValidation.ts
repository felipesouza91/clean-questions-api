import { IValidation } from '../../protocols/IValidation'
import { InvalidParamError } from '../../erros'
import { IEmailValidator } from '../../protocols/IEmailValidator'

export class EmailValidation implements IValidation {
  private readonly fieldName: string
  private readonly emailValidator: IEmailValidator
  constructor (fieldName: string, emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
