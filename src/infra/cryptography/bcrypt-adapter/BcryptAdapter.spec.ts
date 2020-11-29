import bcrypt from 'bcrypt'
import { BcryptAdapter } from './BcryptAdapter'

const salt = 12

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hashed_value'))
  },
  async compare (data: any, encrypted: string): Promise<boolean> {
    return true
  }
}))

const mockSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('has()', () => {
    test('should call hash with correct values', async () => {
      const sut = mockSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })
    test('should return a valid hash on success', async () => {
      const sut = mockSut()
      const hashedValud = await sut.hash('any_value')
      expect(hashedValud).toBe('hashed_value')
    })
    test('should throw if bcrypt throws ', async () => {
      const sut = mockSut()
      jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error())
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare(', () => {
    test('should call compare with correct values', async () => {
      const sut = mockSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'hashed_value')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'hashed_value')
    })
    test('should return a true when compare success', async () => {
      const sut = mockSut()
      const isValid = await sut.compare('any_value', 'hashed_value')
      expect(isValid).toBe(true)
    })
    test('should return a false when compare fails', async () => {
      const sut = mockSut()
      jest.spyOn(bcrypt, 'compare')
        .mockResolvedValueOnce(false)
      const isValid = await sut.compare('any_value', 'invalid_hashed_value')
      expect(isValid).toBe(false)
    })
    test('should throw if bcrypt throws ', async () => {
      const sut = mockSut()
      jest.spyOn(bcrypt, 'compare').mockRejectedValueOnce(new Error())
      const promise = sut.compare('any_value', 'hashed_value')
      await expect(promise).rejects.toThrow()
    })
  })
})
