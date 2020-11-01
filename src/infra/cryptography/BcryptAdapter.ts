import { IHasher } from '../../data/protocols/cryptography/IHasher'
import bcrypt from 'bcrypt'
import { IHashCompare } from '../../data/protocols/cryptography/IHashCompare'

export class BcryptAdapter implements IHasher, IHashCompare {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async compare (value: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(value, hashed)
  }

  async hash (value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt)
    return hashedValue
  }
}
