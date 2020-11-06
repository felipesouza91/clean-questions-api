import { ILoadAccountByEmailRepository } from '../authentication/DbAuthentication.protocols'
import {
  IAddAccount,
  IHasher,
  IAddAccountModel,
  IAccountModel,
  IAddAccountRepository
} from './DbAddAccount.protocols'

interface IDbAddAccountProps {
  hasher: IHasher
  addAccountRepository: IAddAccountRepository
  loadAccountByEmailRepository: ILoadAccountByEmailRepository
}
export class DbAddAccount implements IAddAccount {
  private readonly hasher: IHasher
  private readonly addAccountRepository: IAddAccountRepository
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  constructor (props: IDbAddAccountProps) {
    Object.assign(this, props)
  }

  async add (account: IAddAccountModel): Promise<IAccountModel> {
    this.loadAccountByEmailRepository.loadByEmail(account.email)

    const hasehdPassword = await this.hasher.hash(account.password)
    const accountData = await this.addAccountRepository.add(
      Object.assign({}, account, { password: hasehdPassword })
    )
    return accountData
  }
}
