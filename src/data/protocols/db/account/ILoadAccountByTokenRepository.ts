import { IAccountModel } from '../../../../domain/models/IAccountModel'

export interface ILoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<IAccountModel>
}
