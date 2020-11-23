
import validator from 'validator'
import { IEmailValidator } from '@src/validation/protocols/IEmailValidator'

export class EmailValidatorAdapter implements IEmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
