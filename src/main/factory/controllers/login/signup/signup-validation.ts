
import { EmailValidatorAdapter } from '../../../../../infra/validators/EmailValidatorAdapter'
import { IValidation } from '../../../../../presentation/protocols'

import {
  CompareFieldValidation,
  RequiredFieldValidation,
  EmailValidation,
  ValidationComposite
} from '../../../../../validation/validators'
export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
