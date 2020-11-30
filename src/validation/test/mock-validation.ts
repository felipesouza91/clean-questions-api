import { IValidation } from '@src/presentation/protocols'
import { IEmailValidator } from '../protocols/IEmailValidator'

export const mockEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

export const mockValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
