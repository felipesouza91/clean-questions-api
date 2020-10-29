
import { EmailValidation } from '../../../presentation/helpers/validators/EmailValidation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/RequiredFieldValidation'
import { Validation } from '../../../presentation/helpers/validators/Validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/Validation-composite'
import { EmailValidatorAdapter } from '../../../utils/EmailValidatorAdapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
