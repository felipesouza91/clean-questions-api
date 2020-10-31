import { Authentication, AuthenticationModel } from '../../../domain/usecases/Authentication'
import { IHashCompare } from '../../protocols/cryptography/IHashCompare'
import { ILoadAccountByEmailRepository } from '../../protocols/db/ILoadAccountByEmailRepository'

interface DbAuthenticationProps {
  loadAccountByEmailRepository: ILoadAccountByEmailRepository
  hashCompare: IHashCompare
}

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  private readonly hashCompare: IHashCompare
  constructor ({ loadAccountByEmailRepository ,hashCompare }: DbAuthenticationProps) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashCompare = hashCompare
  }

  async auth ({ email,password }: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(email)
    if (!account) {
      return await new Promise(resolve => resolve(null))
    }
    await this.hashCompare.compare(password, account.password)
    return await new Promise(resolve => resolve('asdad'))
  }
}
