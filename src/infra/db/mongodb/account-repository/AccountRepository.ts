import { IAddAccountRepository } from '../../../../data/protocols/db/IAddAccountRepository'
import { IAddAccountModel } from '../../../../domain/usecases/IAddAccount'
import { IAccountModel } from '../../../../domain/models/IAccountModel'
import { MongoHelper } from '../helpers/MongoHelper'

export class AccountMongoRepository implements IAddAccountRepository {
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }
}
