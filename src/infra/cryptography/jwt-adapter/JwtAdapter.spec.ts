import jwt from 'jsonwebtoken'
import { JwtAdapter } from './JwtAdapter'

describe('Jwt Adapter', () => {
  test('should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenLastCalledWith({ id: 'any_id' }, 'secret')
  })
})