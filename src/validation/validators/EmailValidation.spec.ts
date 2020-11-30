import { InvalidParamError } from '@src/presentation/erros'
import { IEmailValidator } from '../protocols/IEmailValidator'
import { mockEmailValidator } from '../test'
import { EmailValidation } from './EmailValidation'

interface ISutTypes {
  sut: EmailValidation
  emailValidatorSub: IEmailValidator

}

const mockSut = (): ISutTypes => {
  const emailValidatorSub = mockEmailValidator()
  const sut = new EmailValidation('email',emailValidatorSub)
  return {
    sut,
    emailValidatorSub
  }
}

describe('EmailValidation', () => {
  test('Shoud return an erro if EmailValidator returns false', () => {
    const { sut, emailValidatorSub } = mockSut()
    jest.spyOn(emailValidatorSub, 'isValid').mockReturnValueOnce(false)
    const result = sut.validate({ email: 'any_email@email.com' })
    expect(result).toEqual(new InvalidParamError('email'))
  })
  test('Shoud call EmailValidator with  correct email', () => {
    const { sut, emailValidatorSub } = mockSut()
    const isValidSpy = jest.spyOn(emailValidatorSub, 'isValid')
    sut.validate({ email: 'any_email@email.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Shoud throw if EmailValidator throws', () => {
    const { sut, emailValidatorSub } = mockSut()
    jest.spyOn(emailValidatorSub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
