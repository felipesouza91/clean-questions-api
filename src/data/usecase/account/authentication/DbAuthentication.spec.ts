import { DbAuthentication } from './DbAuthentication'
import {
  IAuthentication,
  IAccountModel,
  IAuthenticationDTO,
  IHashCompare,
  IEncrypter,
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository
} from './DbAuthentication.protocols'

interface IISutTypes {
  sut: IAuthentication
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
  hashCompareStub: IHashCompare
  encrypterStub: IEncrypter
  updateAccessTokenRepositoryStub: IUpdateAccessTokenRepository
}

const mockFakeAccount = (): IAccountModel => ({
  id: 'any_id',
  email: 'any_email@mail.com',
  name: 'Any Name',
  password: 'hashed_password'
})

const mockFakeAuthentication = (): IAuthenticationDTO => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const mockLoadAccountByEmailRepositotyStub = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
  implements ILoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<IAccountModel> {
      const account = mockFakeAccount()
      return await new Promise((resolve) => resolve(account))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const mockUpdateAccessTokenRepositoryStub = (): IUpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements IUpdateAccessTokenRepository {
    async updateAccessToken (id: string, accessToken: string): Promise<void> {

    }
  }
  return new UpdateAccessTokenRepositoryStub()
}

const mockCompareHash = (): IHashCompare => {
  class HashComapeStub implements IHashCompare {
    async compare (value: string, hashed: string): Promise<boolean> {
      return true
    }
  }
  return new HashComapeStub()
}

const mockEncrypterStub = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return 'any_token'
    }
  }
  return new EncrypterStub()
}

const mockSut = (): IISutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepositotyStub()
  const hashCompareStub = mockCompareHash()
  const encrypterStub = mockEncrypterStub()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepositoryStub()
  const sut = new DbAuthentication({
    loadAccountByEmailRepository: loadAccountByEmailRepositoryStub,
    hashCompare: hashCompareStub,
    encrypter: encrypterStub,
    updateAccessTokenRepository: updateAccessTokenRepositoryStub
  })
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = mockSut()
    const spyLoad = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(mockFakeAuthentication())
    expect(spyLoad).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('shoud throw if LoadAccountByEmailRepository throws', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = mockSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const response = sut.auth(mockFakeAuthentication())
    await expect(response).rejects.toThrow()
  })

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = mockSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(null)
    const response = await sut.auth(mockFakeAuthentication())
    expect(response).toBeNull()
  })

  test('should call HashCompare with correct values', async () => {
    const { hashCompareStub, sut } = mockSut()
    const spyCompare = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(mockFakeAuthentication())
    expect(spyCompare).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('shoud throw if HashCompare throws', async () => {
    const { hashCompareStub, sut } = mockSut()
    jest.spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const response = sut.auth(mockFakeAuthentication())
    await expect(response).rejects.toThrow()
  })

  test('should return null if HashComparer returns false', async () => {
    const { sut, hashCompareStub } = mockSut()
    jest
      .spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const response = await sut.auth(mockFakeAuthentication())
    expect(response).toBeNull()
  })

  test('should calls Encrypter with corrects id', async () => {
    const { sut, encrypterStub } = mockSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockFakeAuthentication())
    expect(encrypterSpy).toHaveBeenCalledWith('any_id')
  })

  test('shoud throw if Encrypter throws', async () => {
    const { encrypterStub, sut } = mockSut()
    jest.spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const response = sut.auth(mockFakeAuthentication())
    await expect(response).rejects.toThrow()
  })

  test('shoud call Encrypter with correct id', async () => {
    const { sut } = mockSut()
    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBe('any_token')
  })

  test('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = mockSut()
    const updateAccessTokenRepositorySpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockFakeAuthentication())
    expect(updateAccessTokenRepositorySpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('shoud throw if UpdateAccessTokenRepository throws', async () => {
    const { updateAccessTokenRepositoryStub, sut } = mockSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const response = sut.auth(mockFakeAuthentication())
    await expect(response).rejects.toThrow()
  })
})
