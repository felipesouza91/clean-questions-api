import { AccountModel } from '../../domain/models/Account'

export interface ILoadAccountByEmailRepository {
  load: (email: string) => Promise<AccountModel>
}
