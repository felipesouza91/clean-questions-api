
import { DbAddAccount } from './DbAddAccount'
import { mockFakeAccount } from '@src/domain/test'
import {
  IHasher,
  IAccountModel,
  IAddAccountDTO,
  IAddAccountRepository,
  ILoadAccountByEmailRepository
} from './DbAddAccount.protocols'

interface IISutTypes {
  sut: DbAddAccount
  hasherStub: IHasher
  addAccountRepositoryStub: IAddAccountRepository
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}

const mockAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositotyStub implements IAddAccountRepository {
    async add (accountData: IAddAccountDTO): Promise<IAccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_name@email.com',
        password: 'hashed_value'
      }
      return await new Promise((resolve) => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositotyStub()
}

const mockLoadAccountByEmailRepositoryStub = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
  implements ILoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<IAccountModel> {
      return await new Promise((resolve) => resolve(null))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const mockHasherStub = (): IHasher => {
  class HasherStub implements IHasher {
    async hash (value: string): Promise<string> {
      return await new Promise((resolve) => resolve('hashed_value'))
    }
  }

  return new HasherStub()
}

const mockSut = (): IISutTypes => {
  const addAccountRepositoryStub = mockAddAccountRepository()
  const hasherStub = mockHasherStub()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepositoryStub()
  const sut = new DbAddAccount({
    hasher: hasherStub,
    addAccountRepository: addAccountRepositoryStub,
    loadAccountByEmailRepository: loadAccountByEmailRepositoryStub
  })
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

const mockFakeAccountData = (): IAddAccountDTO => {
  return {
    name: 'valid_name',
    email: 'valid_name@email.com',
    password: 'my_password'
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = mockSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    const accountData = mockFakeAccountData()
    await sut.add(accountData)
    expect(hasherSpy).toHaveBeenCalledWith('my_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = mockSut()
    jest
      .spyOn(hasherStub, 'hash')
      .mockRejectedValueOnce(new Error())
    const accountData = mockFakeAccountData()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct value', async () => {
    const { sut, addAccountRepositoryStub } = mockSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = mockFakeAccountData()
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_name@email.com',
      password: 'hashed_value'
    })
  })

  test('Should throw if AddRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = mockSut()
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockRejectedValueOnce(new Error())
    const accountData = mockFakeAccountData()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = mockSut()
    const accountData = mockFakeAccountData()
    const savedData = await sut.add(accountData)
    expect(savedData).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_name@email.com',
      password: 'hashed_value'
    })
  })

  test('should return null if LoadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = mockSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockResolvedValueOnce(mockFakeAccount())
    const response = await sut.add(mockFakeAccountData())
    expect(response).toBeNull()
  })

  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = mockSut()
    const spyLoad = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockFakeAccountData())
    expect(spyLoad).toHaveBeenCalledWith('valid_name@email.com')
  })
})
