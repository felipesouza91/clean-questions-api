import { DbAddAccount } from './DbAddAccount'
import {
  IHasher,
  IAccountModel,
  IAddAccountModel,
  IAddAccountRepository
} from './DbAddAccount.protocols'

interface IISutTypes {
  sut: DbAddAccount
  hasherStub: IHasher
  addAccountRepositoryStub: IAddAccountRepository
}

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositotyStub implements IAddAccountRepository {
    async add (accountData: IAddAccountModel): Promise<IAccountModel> {
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

const makeHasherStub = (): IHasher => {
  class HasherStub implements IHasher {
    async hash (value: string): Promise<string> {
      return await new Promise((resolve) => resolve('hashed_value'))
    }
  }

  return new HasherStub()
}

const makeSut = (): IISutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const hasherStub = makeHasherStub()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub
  }
}

const makeFakeAccountData = (): IAddAccountModel => {
  return {
    name: 'valid_name',
    email: 'valid_name@email.com',
    password: 'my_password'
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    const accountData = makeFakeAccountData()
    await sut.add(accountData)
    expect(hasherSpy).toHaveBeenCalledWith('my_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest
      .spyOn(hasherStub, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const accountData = makeFakeAccountData()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct value', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = makeFakeAccountData()
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_name@email.com',
      password: 'hashed_value'
    })
  })

  test('Should throw if AddRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const accountData = makeFakeAccountData()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const accountData = makeFakeAccountData()
    const savedData = await sut.add(accountData)
    expect(savedData).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_name@email.com',
      password: 'hashed_value'
    })
  })
})
