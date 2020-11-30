import { LoginController } from './LoginController'
import {
  IController,
  IHttpRequest,
  IValidation,
  IAuthentication
} from './LoginController.protocols'
import { MissingParamError } from '@src/presentation/erros'
import { badRequest, serverError, unauthorized, ok } from '@src/presentation/helpers/http/HttpHelper'
import { mockAuthentication } from '@src/presentation/test'

interface IISutTypes {
  sut: IController

  authenticationSub: IAuthentication
  validationStub: IValidation
}

const mockValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const mockFakeRequest = (): IHttpRequest => {
  return {
    body: {
      email: 'any_email@email.com',
      password: 'any_password'
    }
  }
}

const mockSut = (): IISutTypes => {
  const authenticationSub = mockAuthentication()
  const validationStub = mockValidation()
  const sut = new LoginController({
    validation: validationStub,
    authentication: authenticationSub
  })
  return { sut, authenticationSub, validationStub }
}

describe('Login Controller', () => {
  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSub } = mockSut()
    const authSpy = jest.spyOn(authenticationSub, 'auth')
    const httpRequest = mockFakeRequest()
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@email.com', password: 'any_password' })
  })

  test('should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSub } = mockSut()
    jest.spyOn(authenticationSub, 'auth').mockResolvedValueOnce(null)
    const httpRequest = mockFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(unauthorized())
  })

  test('should return 500 if Authentication throws', async () => {
    const { sut, authenticationSub } = mockSut()
    jest.spyOn(authenticationSub, 'auth').mockRejectedValueOnce(new Error())
    const httpRequest = mockFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 if valid credentials are provided', async () => {
    const { sut } = mockSut()
    const httpRequest = mockFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      accessToken: 'any_token'
    }))
  })

  test('Shoud call Validation with  correct values', async () => {
    const { sut, validationStub } = mockSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Shoud return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpRequest = mockFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
