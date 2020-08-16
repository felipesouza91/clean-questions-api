import { LoginController } from './Login'
import { Controller, HttpRequest, EmailValidator, Authentication } from './Login.protocols'
import { MissingParamError, InvalidParamError } from '../../erros'
import { badRequest, serverError, unauthorized, ok } from '../../helpers/HttpHelper'

interface SutTypes {
  sut: Controller
  emailValidatorSub: EmailValidator
  authenticationSub: Authentication
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorSub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorSub()
}
const makeAuthentication = (): Authentication => {
  class AuthenticationSub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return 'any_token'
    }
  }
  return new AuthenticationSub()
}

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
      email: 'any_email@email.com',
      password: 'any_password'
    }
  }
}

const makeSut = (): SutTypes => {
  const emailValidatorSub = makeEmailValidator()
  const authenticationSub = makeAuthentication()
  const sut = new LoginController(emailValidatorSub,authenticationSub)
  return { sut, emailValidatorSub, authenticationSub }
}

describe('Login Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should return 400 if no email is password', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('should return 400 is invalid e-mail is provided', async () => {
    const { sut,emailValidatorSub } = makeSut()
    jest.spyOn(emailValidatorSub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        email: 'invalid_email',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorSub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorSub, 'isValid')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorSub } = makeSut()
    jest.spyOn(emailValidatorSub, 'isValid').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSub } = makeSut()
    const authSpy = jest.spyOn(authenticationSub, 'auth')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith('any_email@email.com', 'any_password')
  })

  test('should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSub } = makeSut()
    jest.spyOn(authenticationSub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(unauthorized())
  })

  test('should return 500 if Authentication throws', async () => {
    const { sut, authenticationSub } = makeSut()
    jest.spyOn(authenticationSub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      accessToken: 'any_token'
    }))
  })
})
