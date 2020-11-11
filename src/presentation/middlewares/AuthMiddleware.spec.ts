import { AuthMiddleware } from './AuthMiddleware'
import { forbidden } from '../helpers/http/HttpHelper'
import { AccessDeniedError } from '../erros'
import { IHttpRequest, IMiddleware } from '../protocols'
import { IAccountModel } from '../../domain/models/IAccountModel'
import { ILoadAccountByToken } from '../../domain/usecases/ILoadAccountByToken'
interface ISutTypes {
  sut: IMiddleware
  loadAccountByTokenStub: ILoadAccountByToken
}

const makeFakeAccount = (): IAccountModel => ({
  email: 'any_email@email.com',
  id: 'any_id',
  name: 'any_name',
  password: 'any_password'
})

const makeLoadAccountByTokenStub = (): ILoadAccountByToken => {
  class LoadAccountByTokenStub implements ILoadAccountByToken {
    async load (token: string, roles?: string): Promise<IAccountModel> {
      return makeFakeAccount()
    }
  }
  return new LoadAccountByTokenStub()
}

const makeSut = (): ISutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByTokenStub()
  const sut = new AuthMiddleware({ loadAccountByToken: loadAccountByTokenStub })
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('AuthMiddleware', () => {
  test('Should return 403 if no x-access-token is exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadAccountByTokenSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    const httpRequest: IHttpRequest = ({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    await sut.handle(httpRequest)
    expect(loadAccountByTokenSpy).toHaveBeenLastCalledWith('any_token')
  })
})
