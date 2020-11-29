import { MongoHelper } from '../helpers/MongoHelper'
import { LogMongoRepository } from './Log'
import { Collection } from 'mongodb'
import { ILogErrorRepository } from '@src/data/protocols/db/log/ILogErrorRepository'

describe('Log Mongo Repository', () => {
  let errorColletion: Collection
  const mockSut = (): ILogErrorRepository => {
    return new LogMongoRepository()
  }

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorColletion = await MongoHelper.getCollection('errors')
    await errorColletion.deleteMany({})
  })

  test('should create an error log on success', async () => {
    const sut = mockSut()
    await sut.log('any_error')
    const count = await errorColletion.countDocuments()
    expect(count).toBe(1)
  })
})
