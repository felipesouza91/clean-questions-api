import { IAccountModel } from '../../../domain/models/IAccountModel'

export interface ILoadAccountByEmailRepository {
  load: (email: string) => Promise<IAccountModel>
}
