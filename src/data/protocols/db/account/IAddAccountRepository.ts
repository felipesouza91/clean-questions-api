import { IAddAccountModel } from '@src/domain/usecases/IAddAccount'
import { IAccountModel } from '@src/domain/models/IAccountModel'

export interface IAddAccountRepository {
  add: (accountData: IAddAccountModel) => Promise<IAccountModel>
}
