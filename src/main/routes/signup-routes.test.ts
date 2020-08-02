import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/MongoHelper'

describe('SingUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountsCollection = MongoHelper.getCollection('accounts')
    await accountsCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
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
