import { ValidationComposite } from '../../presentation/helpers/validators/Validation-composite'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation'
import { CompareFieldValidation } from '../../presentation/helpers/validators/CompareFieldValidation'
import { Validation } from '../../presentation/helpers/validators/Validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
