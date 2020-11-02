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
}
export class DbAddAccount implements IAddAccount {
  private readonly hasher: IHasher
  private readonly addAccountRepository: IAddAccountRepository
  constructor (props: IDbAddAccountProps) {
    Object.assign(this, props)
  }

  async add (account: IAddAccountModel): Promise<IAccountModel> {
    const hasehdPassword = await this.hasher.hash(account.password)
    const accountData = await this.addAccountRepository.add(
      Object.assign({}, account, { password: hasehdPassword })
    )
    return accountData
  }
}
