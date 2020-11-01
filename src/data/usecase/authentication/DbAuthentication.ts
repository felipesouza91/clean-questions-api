import {
  Authentication,
  AuthenticationModel
} from '../../../domain/usecases/Authentication'
import { IHashCompare } from '../../protocols/cryptography/IHashCompare'
import { ITokenGenerator } from '../../protocols/cryptography/ITokenGenerator'

import { ILoadAccountByEmailRepository } from '../../protocols/db/ILoadAccountByEmailRepository'

interface DbAuthenticationProps {
  loadAccountByEmailRepository: ILoadAccountByEmailRepository
  hashCompare: IHashCompare
  tokenGenerator: ITokenGenerator
}

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  private readonly hashCompare: IHashCompare
  private readonly tokenGenerator: ITokenGenerator
  constructor ({
    loadAccountByEmailRepository,
    hashCompare,
    tokenGenerator
  }: DbAuthenticationProps) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashCompare = hashCompare
    this.tokenGenerator = tokenGenerator
  }

  async auth ({ email, password }: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(email)
    if (account) {
      const isValid = await this.hashCompare.compare(password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        return accessToken
      }
    }

    return await new Promise((resolve) => resolve(null))
  }
}
