import jwt from 'jsonwebtoken'
import { JwtAdapter } from './JwtAdapter'
interface ISutType {
  sut: JwtAdapter
}

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'any_token'
  },
  async verify (): Promise<string| object> {
    return 'any_value'
  }
}))

const makeSut = (): ISutType => {
  const sut = new JwtAdapter('secret')

  return {
    sut
  }
}

describe('Jwt Adapter ', () => {
  describe('sign()', () => {
    test('should call sign with correct values', async () => {
      const { sut } = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenLastCalledWith({ id: 'any_id' }, 'secret')
    })

    test('should return a token on sign success', async () => {
      const { sut } = makeSut()
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })

    test('should throws if sign throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => new Error())
      const response = sut.encrypt('any_id')
      expect(response).rejects.toThrow()
    })
  })

  describe('decrypt()', () => {
    test('should call verify with correct values', async () => {
      const { sut } = makeSut()
      const signSpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(signSpy).toHaveBeenLastCalledWith('any_token', 'secret')
    })

    test('should return a value on verify success', async () => {
      const { sut } = makeSut()
      const accessToken = await sut.decrypt('any_token')
      expect(accessToken).toBe('any_value')
    })
  })
})
