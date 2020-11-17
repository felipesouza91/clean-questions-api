import { DbLoadAccountByToken } from './DbLoadAccountByToken'
import { IDecrypter } from '../../protocols/cryptography/IDecrypter'

interface ISutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: IDecrypter
}

const makeDecrypterStub = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt (value: string): Promise<string> {
      return await Promise.resolve(null)
    }
  }
  return new DecrypterStub()
}

const makeSut = (): ISutTypes => {
  const decrypterStub = makeDecrypterStub()
  const sut = new DbLoadAccountByToken({ decrypter: decrypterStub })
  return {
    sut, decrypterStub
  }
}

describe('DbLoadAccountByToken UseCase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decrypterStubSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decrypterStubSpy).toHaveBeenLastCalledWith('any_token')
  })

  test('Should returns null if Decrypter with returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockResolvedValueOnce(null)
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })
})
