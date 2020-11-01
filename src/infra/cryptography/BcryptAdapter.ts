import { IHasher } from '../../data/protocols/cryptography/IHasher'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IHasher {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt)
    return hashedValue
  }
}
