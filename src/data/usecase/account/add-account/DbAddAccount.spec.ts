
import { DbAddAccount } from './DbAddAccount'
import { mockFakeAccount, mockFakeAccountDTO } from '@src/domain/test'
import {
  IHasher,
  IAccountModel,
  IAddAccountRepository,
  ILoadAccountByEmailRepository
} from './DbAddAccount.protocols'
import { mockHasherStub, mockAddAccountRepository } from '@src/data/test'

interface IISutTypes {
  sut: DbAddAccount
  hasherStub: IHasher
  addAccountRepositoryStub: IAddAccountRepository
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
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

describe('DbAddAccount UseCase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = mockSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    const accountData = mockFakeAccountDTO()
    await sut.add(accountData)
    expect(hasherSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = mockSut()
    jest
      .spyOn(hasherStub, 'hash')
      .mockRejectedValueOnce(new Error())
    const accountData = mockFakeAccountDTO()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct value', async () => {
    const { sut, addAccountRepositoryStub } = mockSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = mockFakeAccountDTO()
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'hashed_value'
    })
  })

  test('Should throw if AddRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = mockSut()
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockRejectedValueOnce(new Error())
    const accountData = mockFakeAccountDTO()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = mockSut()
    const accountData = mockFakeAccountDTO()
    const savedData = await sut.add(accountData)
    expect(savedData).toEqual({
      id: 'any_id',
      email: 'any_email@mail.com',
      name: 'Any Name',
      password: 'hashed_password'
    })
  })

  test('should return null if LoadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = mockSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockResolvedValueOnce(mockFakeAccount())
    const response = await sut.add(mockFakeAccountDTO())
    expect(response).toBeNull()
  })

  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = mockSut()
    const spyLoad = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockFakeAccountDTO())
    expect(spyLoad).toHaveBeenCalledWith('any_email@email.com')
  })
})
