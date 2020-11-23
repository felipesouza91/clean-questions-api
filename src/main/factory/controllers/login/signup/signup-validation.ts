
import { EmailValidatorAdapter } from '@src/infra/validators/EmailValidatorAdapter'
import { IValidation } from '@src/presentation/protocols'

import {
  CompareFieldValidation,
  RequiredFieldValidation,
  EmailValidation,
  ValidationComposite
} from '@src/validation/validators'
export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
