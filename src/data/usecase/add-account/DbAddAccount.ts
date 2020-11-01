import {
  IAddAccount,
  IEncrypter,
  IAddAccountModel,
  IAccountModel,
  IAddAccountRepository
} from './DbAddAccount.protocols'
export class DbAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter
  private readonly addAccountRepository: IAddAccountRepository
  constructor (
    encrypter: IEncrypter,
    addAccountRepository: IAddAccountRepository
  ) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (account: IAddAccountModel): Promise<IAccountModel> {
    const hasehdPassword = await this.encrypter.encrypt(account.password)
    const accountData = await this.addAccountRepository.add(
      Object.assign({}, account, { password: hasehdPassword })
    )
    return accountData
  }
}
