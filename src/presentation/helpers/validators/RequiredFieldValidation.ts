import { IValidation } from '../../protocols/IValidation'
import { MissingParamError } from '../../erros'

export class RequiredFieldValidation implements IValidation {
  constructor (
    private readonly fieldName: string
  ) { }

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
