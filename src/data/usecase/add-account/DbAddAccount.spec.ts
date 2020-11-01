import { DbAddAccount } from './DbAddAccount'
import {
  IEncrypter,
  IAccountModel,
  IAddAccountModel,
  IAddAccountRepository
} from './DbAddAccount.protocols'

interface IISutTypes {
  sut: DbAddAccount
  encryptStub: IEncrypter
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

const makeEncrypStub = (): IEncrypter => {
  class EncryptStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise((resolve) => resolve('hashed_value'))
    }
  }

  return new EncryptStub()
}

const makeSut = (): IISutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const encryptStub = makeEncrypStub()
  const sut = new DbAddAccount(encryptStub, addAccountRepositoryStub)
  return {
    sut,
    encryptStub,
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
  test('Should call Encrypter with correct password', async () => {
    const { sut, encryptStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    const accountData = makeFakeAccountData()
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('my_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encryptStub } = makeSut()
    jest
      .spyOn(encryptStub, 'encrypt')
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
