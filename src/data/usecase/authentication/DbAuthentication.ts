import {
  IAuthentication,
  IAuthenticationModel,
  IHashCompare,
  ILoadAccountByEmailRepository,
  IEncrypter,
  IUpdateAccessTokenRepository
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
  constructor ({
    loadAccountByEmailRepository,
    hashCompare,
    encrypter,
    updateAccessTokenRepository
  }: IDbAuthenticationProps) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashCompare = hashCompare
    this.encrypter = encrypter
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth ({ email, password }: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(email)
    if (account) {
      const isValid = await this.hashCompare.compare(password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }

    return await new Promise((resolve) => resolve(null))
  }
}
