import { IAccountModel } from '@src/domain/models/IAccountModel'

export type IAddAccountDTO = Omit<IAccountModel, 'id'>
export interface IAddAccount {
  add: (account: IAddAccountDTO) => Promise<IAccountModel>
}
