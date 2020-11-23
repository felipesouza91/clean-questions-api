
import bcrypt from 'bcrypt'
import { IHashCompare } from '@src/data/protocols/cryptography/IHashCompare'
import { IHasher } from '@src/data/protocols/cryptography/IHasher'

export class BcryptAdapter implements IHasher, IHashCompare {
  constructor (private readonly salt: number) {

  }

  async compare (value: string, hashed: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hashed)
    return isValid
  }

  async hash (value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt)
    return hashedValue
  }
}
