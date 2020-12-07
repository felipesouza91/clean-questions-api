import { SignUpController } from './SignUpController'
import { EmailInUseError, MissingParamError, ServerError } from '@src/presentation/erros'
import {
  IAddAccount,
  IAddAccountDTO,
  IAccountModel,
  IHttpRequest,
  IValidation,
  IAuthentication
} from './SignUpController.protocols'
import { badRequest, serverError, forbidden, created } from '@src/presentation/helpers/http/HttpHelper'
import { mockAuthentication } from '@src/presentation/test'

interface ISutTypes {
  sut: SignUpController
  addAccountStub: IAddAccount
  validationStub: IValidation
  authenticationStub: IAuthentication
}

const mockFakeRequest = (): IHttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const mockFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

const mockAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add (account: IAddAccountDTO): Promise<IAccountModel> {
      const fakeAccount = mockFakeAccount()
      return await new Promise((resolve) => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}

const mockValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const mockSut = (): ISutTypes => {
  const addAccountStub = mockAddAccount()
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const sut = new SignUpController({
    addAccount: addAccountStub,
    validation: validationStub,
    authentication: authenticationStub
  })
  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}

describe('SingUp Controller', () => {
  test('Shoud call AddAccount with  correct values', async () => {
    const { sut, addAccountStub } = mockSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const httpRequest = mockFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = mockSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = mockFakeRequest()
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@email.com', password: 'any_password' })
  })

  test('Shoud return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = mockSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = mockFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(''))
  })

  test('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = mockSut()
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(new Error())
    const httpRequest = mockFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Shoud return 200 if valid data is provided', async () => {
    const { sut } = mockSut()
    const httpRequest = mockFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(created({ accessToken: 'any_token', name: 'Any Name' }))
  })

  test('Shoud return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = mockSut()
    jest.spyOn(addAccountStub, 'add').mockResolvedValueOnce(null)
    const httpRequest = mockFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
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
