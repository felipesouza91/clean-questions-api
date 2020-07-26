import { DbAddAccount } from './DbAddAccount'
import { Encrypter } from '../../protocols/Encrypter'

interface SutTypes {
  sut: DbAddAccount
  encryptStub: Encrypter
}

const makeSut = (): any => {
  class EncryptStub {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_value'))
    }
  }

  const encryptStub = new EncryptStub()
  const sut = new DbAddAccount(encryptStub)
  return {
    sut, encryptStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encryptStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_name@email.com',
      password: 'my_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('my_password')
  })
})
