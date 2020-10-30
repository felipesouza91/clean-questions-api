import { Authentication, AuthenticationModel } from '../../../domain/usecases/Authentication'
import { ILoadAccountByEmailRepository } from '../../protocols/ILoadAccountByEmailRepository'

interface DbAuthenticationProps {
  loadAccountByEmailRepository: ILoadAccountByEmailRepository
}

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  constructor ({ loadAccountByEmailRepository }: DbAuthenticationProps) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth ({ email,password }: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(email)
    return await new Promise(resolve => resolve(null))
  }
}
