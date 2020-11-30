import { IDecrypter } from '../protocols/cryptography/IDecrypter'
import { IEncrypter } from '../protocols/cryptography/IEncrypter'
import { IHashCompare } from '../protocols/cryptography/IHashCompare'
import { IHasher } from '../protocols/cryptography/IHasher'

export const mockHasherStub = (): IHasher => {
  class HasherStub implements IHasher {
    async hash (value: string): Promise<string> {
      return await new Promise((resolve) => resolve('hashed_value'))
    }
  }

  return new HasherStub()
}

export const mockCompareHash = (): IHashCompare => {
  class HashComapeStub implements IHashCompare {
    async compare (value: string, hashed: string): Promise<boolean> {
      return true
    }
  }
  return new HashComapeStub()
}

export const mockEncrypterStub = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return 'any_token'
    }
  }
  return new EncrypterStub()
}

export const mockDecrypterStub = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt (value: string): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }
  return new DecrypterStub()
}
