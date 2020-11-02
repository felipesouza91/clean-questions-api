import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/MongoHelper'
import app from '../config/app'
import { hash } from 'bcrypt'
import config from '../config/env'
describe('Login Routes', () => {
  let accountsCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountsCollection = await MongoHelper.getCollection('accounts')
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
  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123456', Number(config.salt))
      await accountsCollection.insertOne({
        name: 'Felipe Souza Santana',
        email: 'felipedb91@hotmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'felipedb91@hotmail.com',
          password: '123456'
        })
        .expect(200)
    })
  })
})
