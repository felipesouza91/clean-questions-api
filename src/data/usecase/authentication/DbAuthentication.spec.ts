
import { AccountModel } from '../../../domain/models/Account'
import { Authentication, AuthenticationModel } from '../../../domain/usecases/Authentication'
import { ILoadAccountByEmailRepository } from '../../protocols/ILoadAccountByEmailRepository'
import { DbAuthentication } from './DbAuthentication'

interface SutTypes {
  sut: Authentication
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}

const makeFakeAccount = (): AccountModel => ({
  id: '1',
  email: 'any_email@mail.com',
  name: 'Any Name',
  password: 'any_password'
})

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeLoadAccountByEmailReposiotyStub = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      const account = makeFakeAccount()
      return await new Promise(resolve => resolve(account))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailReposiotyStub()
  const sut = new DbAuthentication({ loadAccountByEmailRepository: loadAccountByEmailRepositoryStub })
  return {
    sut, loadAccountByEmailRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    const spyLoad = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(spyLoad).toHaveBeenCalledWith('any_email@mail.com')
  })
})
