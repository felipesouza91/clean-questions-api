
import bcrypt from 'bcrypt'
import { IHashCompare } from '../../../data/protocols/cryptography/IHashCompare'
import { IHasher } from '../../../data/protocols/cryptography/IHasher'

export class BcryptAdapter implements IHasher, IHashCompare {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
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