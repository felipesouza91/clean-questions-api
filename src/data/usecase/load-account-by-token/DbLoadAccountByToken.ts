
import { IAccountModel } from '../../../domain/models/IAccountModel'
import { ILoadAccountByToken } from '../../../domain/usecases/ILoadAccountByToken'
import { IDecrypter } from '../../protocols/cryptography/IDecrypter'
import { ILoadAccountByTokenRepository } from '../../protocols/db/account/ILoadAccountByTokenRepository'

interface IDbLoadAccountByTokenProps {
  decrypter: IDecrypter
  loadAccountByTokenRepository: ILoadAccountByTokenRepository
}

export class DbLoadAccountByToken implements ILoadAccountByToken {
  private readonly decrypter: IDecrypter
  private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository
  constructor (props: IDbLoadAccountByTokenProps) {
    Object.assign(this, props)
  }

  async load (token: string, role?: string): Promise<IAccountModel> {
    const accessToken = await this.decrypter.decrypt(token)
    if (!accessToken) {
      return await Promise.resolve(null)
    }
    return await this.loadAccountByTokenRepository.loadByToken(token, role)
  }
}
