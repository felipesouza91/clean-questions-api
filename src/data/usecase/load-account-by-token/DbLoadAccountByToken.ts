import { IAccountModel } from '../../../domain/models/IAccountModel'
import { ILoadAccountByToken } from '../../../domain/usecases/ILoadAccountByToken'
import { IDecrypter } from '../../protocols/cryptography/IDecrypter'

interface IDbLoadAccountByTokenProps {
  decrypter: IDecrypter
}

export class DbLoadAccountByToken implements ILoadAccountByToken {
  private readonly decrypter: IDecrypter
  constructor (props: IDbLoadAccountByTokenProps) {
    Object.assign(this, props)
  }

  async load (token: string, role?: string): Promise<IAccountModel> {
    await this.decrypter.decrypt(token)
    return await Promise.resolve(null)
  }
}
