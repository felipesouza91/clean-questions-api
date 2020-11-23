
import { makeLoginValidation } from './login-validation'
import { IValidation } from '@src/presentation/protocols'
import { IEmailValidator } from '@src/validation/protocols/IEmailValidator'
import { RequiredFieldValidation, EmailValidation,ValidationComposite } from '@src/validation/validators'
jest.mock('@src/validation/validators/Validation-composite')

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('should call Validation composity with all validations', () => {
    const emailValidatorAdapter = makeEmailValidator()
    makeLoginValidation()
    const validations: IValidation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', emailValidatorAdapter))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
