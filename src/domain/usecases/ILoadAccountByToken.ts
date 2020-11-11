import { IAccountModel } from '../models/IAccountModel'

export interface ILoadAccountByToken {
  load: (token: string, role?: string) => Promise<IAccountModel>
}
