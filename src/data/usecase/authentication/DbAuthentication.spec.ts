import { DbAuthentication } from './DbAuthentication'
import {
  IAuthentication,
  IAccountModel,
  IAuthenticationModel,
  IHashCompare,
  ITokenGenerator,
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository
} from './DbAuthentication.protocols'

interface IISutTypes {
  sut: IAuthentication
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
  hashCompareStub: IHashCompare
  tokenGeneratorStub: ITokenGenerator
  updateAccessTokenRepositoryStub: IUpdateAccessTokenRepository
}

const makeFakeAccount = (): IAccountModel => ({
  id: 'any_id',
  email: 'any_email@mail.com',
  name: 'Any Name',
  password: 'hashed_password'
})

const makeFakeAuthentication = (): IAuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeLoadAccountByEmailReposiotyStub = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
  implements ILoadAccountByEmailRepository {
    async load (email: string): Promise<IAccountModel> {
      const account = makeFakeAccount()
      return await new Promise((resolve) => resolve(account))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeUpdateAccessTokenRepositoryStub = (): IUpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements IUpdateAccessTokenRepository {
    async update (id: string, accessToken: string): Promise<void> {

    }
  }
  return new UpdateAccessTokenRepositoryStub()
}

const makeCompareHash = (): IHashCompare => {
  class HashComapeStub implements IHashCompare {
    async compare (value: string, hashed: string): Promise<boolean> {
      return true
    }
  }
  return new HashComapeStub()
}

const makeTokenGeneretorStub = (): ITokenGenerator => {
  class TokenGeneratorStub implements ITokenGenerator {
    async generate (id: string): Promise<string> {
      return 'any_token'
    }
  }
  return new TokenGeneratorStub()
}

const makeSut = (): IISutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailReposiotyStub()
  const hashCompareStub = makeCompareHash()
  const tokenGeneratorStub = makeTokenGeneretorStub()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepositoryStub()
  const sut = new DbAuthentication({
    loadAccountByEmailRepository: loadAccountByEmailRepositoryStub,
    hashCompare: hashCompareStub,
    tokenGenerator: tokenGeneratorStub,
    updateAccessTokenRepository: updateAccessTokenRepositoryStub
  })
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    const spyLoad = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(spyLoad).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('shoud throw if LoadAccountByEmailRepository throws', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const response = sut.auth(makeFakeAuthentication())
    await expect(response).rejects.toThrow()
  })

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(null)
    const response = await sut.auth(makeFakeAuthentication())
    expect(response).toBeNull()
  })

  test('should call HashCompare with correct values', async () => {
    const { hashCompareStub, sut } = makeSut()
    const spyCompare = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(makeFakeAuthentication())
    expect(spyCompare).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('shoud throw if HashCompare throws', async () => {
    const { hashCompareStub, sut } = makeSut()
    jest.spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const response = sut.auth(makeFakeAuthentication())
    await expect(response).rejects.toThrow()
  })

  test('should return null if HashComparer returns false', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest
      .spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const response = await sut.auth(makeFakeAuthentication())
    expect(response).toBeNull()
  })

  test('should calls TokenGenerator with corrects id', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const tokenGenerateSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.auth(makeFakeAuthentication())
    expect(tokenGenerateSpy).toHaveBeenCalledWith('any_id')
  })

  test('shoud throw if TokenGenerator throws', async () => {
    const { tokenGeneratorStub, sut } = makeSut()
    jest.spyOn(tokenGeneratorStub, 'generate')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const response = sut.auth(makeFakeAuthentication())
    await expect(response).rejects.toThrow()
  })

  test('shoud call TokenGenerator with correct id', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBe('any_token')
  })

  test('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateAccessTokenRepositorySpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update')
    await sut.auth(makeFakeAuthentication())
    expect(updateAccessTokenRepositorySpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('shoud throw if UpdateAccessTokenRepository throws', async () => {
    const { updateAccessTokenRepositoryStub, sut } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'update')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const response = sut.auth(makeFakeAuthentication())
    await expect(response).rejects.toThrow()
  })
})
