import { LoginController } from './LoginController'
import { IController, IHttpRequest, IValidation, IAuthentication } from './LoginController.protocols'
import { MissingParamError } from '../../../erros'
import { badRequest, serverError, unauthorized, ok } from '../../../helpers/http/HttpHelper'
import { IAuthenticationModel } from '../../../../domain/usecases/IAuthentication'

interface IISutTypes {
  sut: IController

  authenticationSub: IAuthentication
  validationStub: IValidation
}

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
const makeAuthentication = (): IAuthentication => {
  class AuthenticationSub implements IAuthentication {
    async auth (authenticationData: IAuthenticationModel): Promise<string> {
      return 'any_token'
    }
  }
  return new AuthenticationSub()
}

const makeFakeRequest = (): IHttpRequest => {
  return {
    body: {
      email: 'any_email@email.com',
      password: 'any_password'
    }
  }
}

const makeSut = (): IISutTypes => {
  const authenticationSub = makeAuthentication()
  const validationStub = makeValidation()
  const sut = new LoginController({
    validation: validationStub,
    authentication: authenticationSub
  })
  return { sut, authenticationSub, validationStub }
}

describe('Login Controller', () => {
  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSub } = makeSut()
    const authSpy = jest.spyOn(authenticationSub, 'auth')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@email.com', password: 'any_password' })
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

  test('Shoud call Validation with  correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Shoud return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
