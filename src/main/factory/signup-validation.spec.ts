import { makeSignUpValidation } from './signup-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/Validation-composite'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation'
import { Validation } from '../../presentation/helpers/validators/Validation'

jest.mock('../../presentation/helpers/validators/Validation-composite')

describe('SignUpValidation Factory', () => {
  test('should call Validation composity with all validatations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
