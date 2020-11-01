import { AddAccountModel } from '../../../domain/usecases/AddAccount'
import { AccountModel } from '../../../domain/models/Account'

export interface IAddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
