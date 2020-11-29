import { AuthMiddleware } from './AuthMiddleware'
import {
  forbidden,
  ok,
  serverError,
  AccessDeniedError,
  IHttpRequest,
  IMiddleware ,
  IAccountModel ,
  ILoadAccountByToken
} from './AuthMiddleware.protocols'

interface ISutTypes {
  sut: IMiddleware
  loadAccountByTokenStub: ILoadAccountByToken
}

const mockFakeAccount = (): IAccountModel => ({
  email: 'any_email@email.com',
  id: 'any_id',
  name: 'any_name',
  password: 'any_password'
})

const mockFakeRequest = (): IHttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const mockLoadAccountByTokenStub = (): ILoadAccountByToken => {
  class LoadAccountByTokenStub implements ILoadAccountByToken {
    async load (token: string, roles?: string): Promise<IAccountModel> {
      return mockFakeAccount()
    }
  }
  return new LoadAccountByTokenStub()
}

const mockSut = (role?: string): ISutTypes => {
  const loadAccountByTokenStub = mockLoadAccountByTokenStub()
  const sut = new AuthMiddleware({ loadAccountByToken: loadAccountByTokenStub, role })
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('AuthMiddleware', () => {
  test('Should return 403 if no x-access-token is exists in headers', async () => {
    const { sut } = mockSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = mockSut(role)
    const loadAccountByTokenSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(mockFakeRequest())
    expect(loadAccountByTokenSpy).toHaveBeenLastCalledWith('any_token','any_role')
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = mockSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountByToken returns any account', async () => {
    const { sut } = mockSut()
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(ok({ accountId: 'any_id' }))
  })

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = mockSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
