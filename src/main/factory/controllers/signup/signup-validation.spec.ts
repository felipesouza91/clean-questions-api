
import { IValidation } from '../../../../presentation/protocols'
import {
  CompareFieldValidation,
  RequiredFieldValidation,
  EmailValidation,
  ValidationComposite
} from '../../../../validation/validators'
import { IEmailValidator } from '../../../../validation/protocols/IEmailValidator'
import { makeSignUpValidation } from './signup-validation'
jest.mock('../../../../validation/validators/Validation-composite')

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('should call Validation composity with all validatations', () => {
    const emailValidatorAdapter = makeEmailValidator()
    makeSignUpValidation()
    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', emailValidatorAdapter))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
