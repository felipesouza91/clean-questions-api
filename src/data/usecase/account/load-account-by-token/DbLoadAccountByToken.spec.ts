import { IDecrypter, ILoadAccountByTokenRepository } from './DbLoadAccountByToken.protocols'
import { DbLoadAccountByToken } from './DbLoadAccountByToken'

import { mockDecrypterStub, mockLoadAccountByTokenRepositoryStub } from '@src/data/test'
interface ISutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: IDecrypter
  loadAccountByTokenRepositoryStub: ILoadAccountByTokenRepository
}

const mockSut = (): ISutTypes => {
  const decrypterStub = mockDecrypterStub()
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepositoryStub()
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
    const { sut, decrypterStub } = mockSut()
    const decrypterStubSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decrypterStubSpy).toHaveBeenLastCalledWith('any_token')
  })

  test('Should returns null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = mockSut()
    jest.spyOn(decrypterStub, 'decrypt').mockResolvedValueOnce(null)
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should return throws if Decrypter throws', async () => {
    const { sut, decrypterStub } = mockSut()
    jest.spyOn(decrypterStub, 'decrypt').mockRejectedValueOnce(new Error())
    const account = sut.load('any_token', 'any_role')
    expect(account).rejects.toThrow()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = mockSut()
    const loadAccountByTokenRepositoryStubSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadAccountByTokenRepositoryStubSpy).toHaveBeenLastCalledWith('any_token','any_role')
  })

  test('Should returns null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = mockSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockResolvedValueOnce(null)
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should return throws if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = mockSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockRejectedValueOnce(new Error())
    const account = sut.load('any_token', 'any_role')
    expect(account).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = mockSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual({
      id: 'any_id',
      email: 'any_email@mail.com',
      name: 'Any Name',
      password: 'hashed_password'
    })
  })
})
