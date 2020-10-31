import { Authentication, AuthenticationModel } from '../../../domain/usecases/Authentication'
import { ILoadAccountByEmailRepository } from '../../protocols/db/ILoadAccountByEmailRepository'

interface DbAuthenticationProps {
  loadAccountByEmailRepository: ILoadAccountByEmailRepository
}

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  constructor ({ loadAccountByEmailRepository }: DbAuthenticationProps) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth ({ email,password }: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(email)
    if (!account) {
      return await new Promise(resolve => resolve(null))
    }
    return await new Promise(resolve => resolve('asdad'))
  }
}
