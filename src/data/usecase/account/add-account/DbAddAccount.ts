
import {
  IAddAccount,
  IHasher,
  IAddAccountDTO,
  IAccountModel,
  IAddAccountRepository,
  ILoadAccountByEmailRepository
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

  async add (account: IAddAccountDTO): Promise<IAccountModel> {
    const existedAccount = await this.loadAccountByEmailRepository.loadByEmail(account.email)
    if (existedAccount) {
      return null
    }
    const hasehdPassword = await this.hasher.hash(account.password)
    const savedAccount = await this.addAccountRepository.add(
      Object.assign({}, account, { password: hasehdPassword })
    )
    return savedAccount
  }
}
