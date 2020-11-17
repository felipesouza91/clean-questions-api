import { DbLoadAccountByToken } from './DbLoadAccountByToken'
import { IDecrypter } from '../../protocols/cryptography/IDecrypter'
import { ILoadAccountByTokenRepository } from '../../../data/protocols/db/account/ILoadAccountByTokenRepository'
import { IAccountModel } from '../../../domain/models/IAccountModel'
interface ISutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: IDecrypter
  loadAccountByTokenRepositoryStub: ILoadAccountByTokenRepository
}

const makeFakeAccount = (): IAccountModel => ({
  id: 'any_id',
  email: 'any_email@mail.com',
  name: 'Any Name',
  password: 'hashed_password'
})

const makeLoadAccountByTokenRepositoryStub = (): ILoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements ILoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<IAccountModel> {
      return await Promise.resolve(makeFakeAccount())
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

const makeDecrypterStub = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt (value: string): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }
  return new DecrypterStub()
}

const makeSut = (): ISutTypes => {
  const decrypterStub = makeDecrypterStub()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepositoryStub()
  const sut = new DbLoadAccountByToken({
    decrypter: decrypterStub,
    loadAccountByTokenRepository: loadAccountByTokenRepositoryStub
  })
  return {
    sut, decrypterStub, loadAccountByTokenRepositoryStub
  }
}

describe('DbLoadAccountByToken UseCase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decrypterStubSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decrypterStubSpy).toHaveBeenLastCalledWith('any_token')
  })

  test('Should returns null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockResolvedValueOnce(null)
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadAccountByTokenRepositoryStubSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadAccountByTokenRepositoryStubSpy).toHaveBeenLastCalledWith('any_token','any_role')
  })

  test('Should returns null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockResolvedValueOnce(null)
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual({
      id: 'any_id',
      email: 'any_email@mail.com',
      name: 'Any Name',
      password: 'hashed_password'
    })
  })
})
