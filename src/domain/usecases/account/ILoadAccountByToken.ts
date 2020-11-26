import { IAccountModel } from '@src/domain/models/IAccountModel'
export interface ILoadAccountByToken {
  load: (token: string, role?: string) => Promise<IAccountModel>
}
