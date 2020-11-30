import { mockFakeAccount } from '@src/domain/test'
import { IAddAccountRepository } from '../protocols/db/account/IAddAccountRepository'
import { ILoadAccountByTokenRepository } from '../protocols/db/account/ILoadAccountByTokenRepository'
import { IUpdateAccessTokenRepository } from '../protocols/db/account/IUpdateAccessTokenRepository'
import { IAccountModel, IAddAccountDTO, ILoadAccountByEmailRepository } from '../usecase/account/add-account/DbAddAccount.protocols'

export const mockAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositotyStub implements IAddAccountRepository {
    async add (accountData: IAddAccountDTO): Promise<IAccountModel> {
      return await new Promise((resolve) => resolve(mockFakeAccount()))
    }
  }
  return new AddAccountRepositotyStub()
}

export const mockLoadAccountByEmailRepositotyStub = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
  implements ILoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<IAccountModel> {
      const account = mockFakeAccount()
      return await new Promise((resolve) => resolve(account))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const mockUpdateAccessTokenRepositoryStub = (): IUpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements IUpdateAccessTokenRepository {
    async updateAccessToken (id: string, accessToken: string): Promise<void> {

    }
  }
  return new UpdateAccessTokenRepositoryStub()
}

export const mockLoadAccountByTokenRepositoryStub = (): ILoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements ILoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<IAccountModel> {
      return await Promise.resolve(mockFakeAccount())
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}
