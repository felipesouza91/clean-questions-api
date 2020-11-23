import { IAccountModel } from '@src/domain/models/IAccountModel'

export interface ILoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<IAccountModel>
}
