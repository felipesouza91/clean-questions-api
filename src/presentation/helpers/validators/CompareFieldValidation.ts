import { IValidation } from '../../protocols/IValidation'
import { InvalidParamError } from '../../erros'

export class CompareFieldValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}
