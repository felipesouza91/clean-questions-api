
import { EmailValidation, RequiredFieldValidation , ValidationComposite } from '@src/validation/validators'
import { IValidation } from '@src/presentation/protocols'
import { EmailValidatorAdapter } from '@src/infra/validators/EmailValidatorAdapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
