import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/MongoHelper'
import app from '../config/app'

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountsCollection = await MongoHelper.getCollection('accounts')
    await accountsCollection.deleteMany({})
  })
  describe('POST /signup', () => {
    test('Should return 201 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Felipe Souza Santana',
          email: 'felipedb91@hotmail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(201)
    })
  })
})
