import { DbAddAccount } from './DbAddAccount'

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return await new Promise(resolve => resolve('hashed_value'))
      }
    }

    const encryptStub = new EncrypterStub()
    const sut = new DbAddAccount(encryptStub)
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
