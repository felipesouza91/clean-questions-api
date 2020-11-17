import jwt from 'jsonwebtoken'
import { IDecrypter } from '../../../data/protocols/cryptography/IDecrypter'
import { IEncrypter } from '../../../data/protocols/cryptography/IEncrypter'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (private readonly secret: string) {}

  async decrypt (value: string): Promise<string> {
    await jwt.verify(value, this.secret)
    return await Promise.resolve(null)
  }

  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }
}
