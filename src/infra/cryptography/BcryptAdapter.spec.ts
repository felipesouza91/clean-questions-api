import bcrypt from 'bcrypt'
import { BcryptAdapter } from './BcryptAdapter'

const salt = 12

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hashed_value'))
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('should return a hash on success', async () => {
    const sut = makeSut()
    const hashedValud = await sut.encrypt('any_value')
    expect(hashedValud).toBe('hashed_value')
  })

  test('should return a hash on success', async () => {
    const sut = makeSut()
    const hashedValud = await sut.encrypt('any_value')
    expect(hashedValud).toBe('hashed_value')
  })
})
