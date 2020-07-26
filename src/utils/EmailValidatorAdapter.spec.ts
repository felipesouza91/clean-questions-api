import { EmailValidatorAdapter } from './EmailValidatorAdapter'
import validator from 'validator'

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

jest.mock('validator', () => ({
  isEmail (email: string): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', async () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', async () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@email.com')
    expect(isValid).toBe(true)
  })
  test('Should call validator with corret e-mail', async () => {
    const sut = makeSut()
    sut.isValid('valid_email@email.com')
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    expect(isEmailSpy).toHaveBeenCalledWith('valid_email@email.com')
  })
})
