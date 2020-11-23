
import { MissingParamError } from '@src/presentation/erros'
import { IValidation } from '@src/presentation/protocols'

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
