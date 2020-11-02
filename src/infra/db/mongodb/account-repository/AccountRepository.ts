import { IAddAccountRepository } from '../../../../data/protocols/db/account/IAddAccountRepository'
import { IAddAccountModel } from '../../../../domain/usecases/IAddAccount'
import { IAccountModel } from '../../../../domain/models/IAccountModel'
import { MongoHelper } from '../helpers/MongoHelper'
import { ILoadAccountByEmailRepository } from '../../../../data/protocols/db/account/ILoadAccountByEmailRepository'
import { IUpdateAccessTokenRepository } from '../../../../data/protocols/db/account/IUpdateAccessTokenRepository'

export class AccountMongoRepository implements IAddAccountRepository,
  ILoadAccountByEmailRepository, IUpdateAccessTokenRepository {
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

  async updateAccessToken (id: string, accessToken: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: id }, { $set: { accessToken } })
  }
}
