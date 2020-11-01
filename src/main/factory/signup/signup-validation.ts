import { CompareFieldValidation } from '../../../presentation/helpers/validators/CompareFieldValidation'
import { EmailValidation } from '../../../presentation/helpers/validators/EmailValidation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/RequiredFieldValidation'

import { ValidationComposite } from '../../../presentation/helpers/validators/Validation-composite'
import { IValidation } from '../../../presentation/protocols/IValidation'
import { EmailValidatorAdapter } from '../../../utils/EmailValidatorAdapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
