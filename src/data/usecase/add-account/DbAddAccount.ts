import { AddAccount, Encrypter, AddAccountModel, AccountModel, AddAccountRepository } from './DbAddAccount.protocols'
export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository
  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hasehdPassword = await this.encrypter.encrypt(account.password)
    const accountData = await this.addAccountRepository.add(Object.assign({},account, { password: hasehdPassword }))
    return accountData
  }
}
