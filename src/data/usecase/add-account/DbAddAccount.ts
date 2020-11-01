import {
  IAddAccount,
  IHasher,
  IAddAccountModel,
  IAccountModel,
  IAddAccountRepository
} from './DbAddAccount.protocols'
export class DbAddAccount implements IAddAccount {
  private readonly hasher: IHasher
  private readonly addAccountRepository: IAddAccountRepository
  constructor (
    hasher: IHasher,
    addAccountRepository: IAddAccountRepository
  ) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
  }

  async add (account: IAddAccountModel): Promise<IAccountModel> {
    const hasehdPassword = await this.hasher.hash(account.password)
    const accountData = await this.addAccountRepository.add(
      Object.assign({}, account, { password: hasehdPassword })
    )
    return accountData
  }
}
