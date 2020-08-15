import { LogErrorRepository } from '../../../../data/protocols/LogErrorRepository'
import { MongoHelper } from '../helpers/MongoHelper'

export class LogMongoRepository implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    const errorColletion = await MongoHelper.getCollection('errors')
    await errorColletion.insertOne({ stack, date: new Date() })
  }
}
