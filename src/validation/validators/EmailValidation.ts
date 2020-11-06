import { InvalidParamError } from '../../presentation/erros'
import { IEmailValidator } from '../protocols/IEmailValidator'
import { IValidation } from '../../presentation/protocols'

export class EmailValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: IEmailValidator
  ) { }

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
