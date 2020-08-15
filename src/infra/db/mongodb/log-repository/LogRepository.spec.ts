import { MongoHelper } from '../helpers/MongoHelper'
import { LogMongoRepository } from './Log'
import { LogErrorRepository } from '../../../../data/protocols/LogErrorRepository'

import { Collection } from 'mongodb'

describe('Log Mongo Repository', () => {
  let errorColletion: Collection
  const makeSut = (): LogErrorRepository => {
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
    const sut = makeSut()
    await sut.log('any_error')
    const count = await errorColletion.countDocuments()
    expect(count).toBe(1)
  })
})
