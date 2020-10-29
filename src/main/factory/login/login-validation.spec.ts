
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/RequiredFieldValidation'
import { Validation } from '../../../presentation/helpers/validators/Validation'
import { EmailValidator } from '../../../presentation/protocols/EmailValidator'
import { EmailValidation } from '../../../presentation/helpers/validators/EmailValidation'
import { ValidationComposite } from '../../../presentation/helpers/validators/Validation-composite'
import { makeLoginValidation } from './login-validation'

jest.mock('../../../presentation/helpers/validators/Validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('should call Validation composity with all validatations', () => {
    const emailValidatorAdapter = makeEmailValidator()
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', emailValidatorAdapter))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
