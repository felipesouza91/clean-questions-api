import { EmailValidation } from './EmailValidation'

import { IEmailValidator } from '../../protocols/IEmailValidator'
import { InvalidParamError } from '../../erros'

interface ISutTypes {
  sut: EmailValidation
  emailValidatorSub: IEmailValidator

}

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): ISutTypes => {
  const emailValidatorSub = makeEmailValidator()
  const sut = new EmailValidation('email',emailValidatorSub)
  return {
    sut,
    emailValidatorSub
  }
}

describe('EmailValidation', () => {
  test('Shoud return an erro if EmailValidator returns false', () => {
    const { sut, emailValidatorSub } = makeSut()
    jest.spyOn(emailValidatorSub, 'isValid').mockReturnValueOnce(false)
    const result = sut.validate({ email: 'any_email@email.com' })
    expect(result).toEqual(new InvalidParamError('email'))
  })
  test('Shoud call EmailValidator with  correct email', () => {
    const { sut, emailValidatorSub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorSub, 'isValid')
    sut.validate({ email: 'any_email@email.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Shoud throw if EmailValidator throws', () => {
    const { sut, emailValidatorSub } = makeSut()
    jest.spyOn(emailValidatorSub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
