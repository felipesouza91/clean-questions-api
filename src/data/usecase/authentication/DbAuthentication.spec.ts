
import { AccountModel } from '../../../domain/models/Account'
import { ILoadAccountByEmailRepository } from '../../protocols/ILoadAccountByEmailRepository'

import { DbAuthentication } from './DbAuthentication'

describe('DbAuthentication UseCase', () => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      const account = {
        id: '1',
        email: 'any_email@mail.com',
        name: 'Any Name',
        password: 'any_password'
      }
      return await new Promise(resolve => resolve(account))
    }
  }

  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthentication({ loadAccountByEmailRepository: loadAccountByEmailRepositoryStub })
    const spyLoad = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(spyLoad).toHaveBeenCalledWith('any_email@mail.com')
  })
})
