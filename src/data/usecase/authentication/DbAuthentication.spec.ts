import { AccountModel } from '../../../domain/models/Account'
import {
  Authentication,
  AuthenticationModel
} from '../../../domain/usecases/Authentication'
import { IHashCompare } from '../../protocols/cryptography/IHashCompare'
import { ILoadAccountByEmailRepository } from '../../protocols/db/ILoadAccountByEmailRepository'

import { DbAuthentication } from './DbAuthentication'

interface SutTypes {
  sut: Authentication
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
  hashCompareStub: IHashCompare
}

const makeFakeAccount = (): AccountModel => ({
  id: '1',
  email: 'any_email@mail.com',
  name: 'Any Name',
  password: 'hashed_password'
})

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeLoadAccountByEmailReposiotyStub = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
  implements ILoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      const account = makeFakeAccount()
      return await new Promise((resolve) => resolve(account))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeCompareHash = (): IHashCompare => {
  class HashComapeStub implements IHashCompare {
    async compare (value: string, hashed: string): Promise<boolean> {
      return true
    }
  }
  return new HashComapeStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailReposiotyStub()
  const hashCompareStub = makeCompareHash()
  const sut = new DbAuthentication({
    loadAccountByEmailRepository: loadAccountByEmailRepositoryStub,
    hashCompare: hashCompareStub
  })
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub
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
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const response = sut.auth(makeFakeAuthentication())
    await expect(response).rejects.toThrow()
  })

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
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
})
