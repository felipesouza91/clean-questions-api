import { IAddAccountRepository } from '@src/data/protocols/db/account/IAddAccountRepository'
import { IAddAccountDTO } from '@src/domain/usecases/account/IAddAccount'
import { IAccountModel } from '@src/domain/models/IAccountModel'
import { MongoHelper } from '../helpers/MongoHelper'
import { ILoadAccountByEmailRepository } from '@src/data/protocols/db/account/ILoadAccountByEmailRepository'
import { IUpdateAccessTokenRepository } from '@src/data/protocols/db/account/IUpdateAccessTokenRepository'
import { ILoadAccountByTokenRepository } from '@src/data/protocols/db/account/ILoadAccountByTokenRepository'

export class AccountMongoRepository implements IAddAccountRepository,
  ILoadAccountByEmailRepository, IUpdateAccessTokenRepository, ILoadAccountByTokenRepository {
  async add (accountData: IAddAccountDTO): Promise<IAccountModel> {
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

  async loadByToken (token: string, role?: string): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ accessToken: token, $or: [{ role }, { role: 'admin' }] })
    return account && MongoHelper.map(account)
  }
}
