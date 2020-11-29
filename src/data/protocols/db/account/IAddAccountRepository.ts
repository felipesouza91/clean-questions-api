import { IAddAccountDTO } from '@src/domain/usecases/account/IAddAccount'
import { IAccountModel } from '@src/domain/models/IAccountModel'

export interface IAddAccountRepository {
  add: (accountData: IAddAccountDTO) => Promise<IAccountModel>
}
