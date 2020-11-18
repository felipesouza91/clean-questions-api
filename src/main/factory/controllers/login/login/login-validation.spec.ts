
import { makeLoginValidation } from './login-validation'
import { IValidation } from '../../../../../presentation/protocols'
import { IEmailValidator } from '../../../../../validation/protocols/IEmailValidator'
import { RequiredFieldValidation, EmailValidation,ValidationComposite } from '../../../../../validation/validators'
jest.mock('../../../../../validation/validators/Validation-composite')

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
