
import {
  IAccountModel,
  IDecrypter,
  ILoadAccountByTokenRepository,
  ILoadAccountByToken
} from './DbLoadAccountByToken.protocols'
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
    let accessToken: string
    try {
      accessToken = await this.decrypter.decrypt(token)
    } catch (error) {
      return null
    }
    if (accessToken) {
      return await this.loadAccountByTokenRepository.loadByToken(token, role)
    }
    return await Promise.resolve(null)
  }
}
