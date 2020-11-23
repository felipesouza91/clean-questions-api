import { IAccountModel } from '@src/domain/models/IAccountModel'

export interface ILoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<IAccountModel>
}
