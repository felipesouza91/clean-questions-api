import {
  IAuthentication,
  IAuthenticationDTO,
  IHashCompare,
  ILoadAccountByEmailRepository,
  IEncrypter,
  IUpdateAccessTokenRepository,
  IAuthenticationModel
} from './DbAuthentication.protocols'

interface IDbAuthenticationProps {
  loadAccountByEmailRepository: ILoadAccountByEmailRepository
  hashCompare: IHashCompare
  encrypter: IEncrypter
  updateAccessTokenRepository: IUpdateAccessTokenRepository
}

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  private readonly hashCompare: IHashCompare
  private readonly encrypter: IEncrypter
  private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository

  constructor (props: IDbAuthenticationProps) {
    Object.assign(this, props)
  }

  async auth ({ email, password }: IAuthenticationDTO): Promise<IAuthenticationModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (account) {
      const isValid = await this.hashCompare.compare(password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)

        return ({ accessToken, name: account.name })
      }
    }
    return await new Promise((resolve) => resolve(null))
  }
}
