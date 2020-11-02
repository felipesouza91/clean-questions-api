import { IAddAccountRepository } from '../../../../data/protocols/db/IAddAccountRepository'
import { IAddAccountModel } from '../../../../domain/usecases/IAddAccount'
import { IAccountModel } from '../../../../domain/models/IAccountModel'
import { MongoHelper } from '../helpers/MongoHelper'
import { ILoadAccountByEmailRepository } from '../../../../data/protocols/db/ILoadAccountByEmailRepository'

export class AccountMongoRepository implements IAddAccountRepository, ILoadAccountByEmailRepository {
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }
}
