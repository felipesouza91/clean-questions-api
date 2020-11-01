
import { ILogErrorRepository } from '../../../../data/protocols/db/ILogErrorRepository'
import { MongoHelper } from '../helpers/MongoHelper'

export class LogMongoRepository implements ILogErrorRepository {
  async log (stack: string): Promise<void> {
    const errorColletion = await MongoHelper.getCollection('errors')
    await errorColletion.insertOne({ stack, date: new Date() })
  }
}
