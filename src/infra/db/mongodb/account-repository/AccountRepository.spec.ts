import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/MongoHelper'
import { AccountMongoRepository } from './AccountRepository'
import { mockFakeAccountDTO } from '@src/domain/test'
describe('Account Mongo Repository', () => {
  let accountsCollection: Collection
  const mockSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

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

  describe('add()', () => {
    test('Should return any account on add success', async () => {
      const sut = mockSut()
      const account = await sut.add(mockFakeAccountDTO())
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@email.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('loadByEmail()', () => {
    test('Should return any account on loadByEmail success', async () => {
      const sut = mockSut()
      await accountsCollection.insertOne(mockFakeAccountDTO())
      const account = await sut.loadByEmail('any_email@email.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@email.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = mockSut()
      const account = await sut.loadByEmail('any_email@email.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update accessToken on updateAccessToken success', async () => {
      const sut = mockSut()
      const resultAccount = await accountsCollection.insertOne(mockFakeAccountDTO())
      const fakeAccount = resultAccount.ops[0]
      expect(fakeAccount.accessToken).toBeFalsy()
      await sut.updateAccessToken(fakeAccount._id, 'any_token')
      const account = await accountsCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })

  describe('loadByToken()', () => {
    test('Should return an account on loadByToken without role', async () => {
      const sut = mockSut()
      const resultAccount = await accountsCollection.insertOne({ ...mockFakeAccountDTO(), accessToken: 'any_token' })
      const fakeAccount = resultAccount.ops[0]
      expect(fakeAccount.accessToken).toBeTruthy()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@email.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return an account on loadByToken with role', async () => {
      const sut = mockSut()
      const fakeAccountObj = {
        ...mockFakeAccountDTO(),
        accessToken: 'any_token',
        role: 'any_role'
      }
      const resultAccount = await accountsCollection.insertOne(fakeAccountObj)
      const fakeAccount = resultAccount.ops[0]
      expect(fakeAccount.accessToken).toBeTruthy()
      const account = await sut.loadByToken('any_token', 'any_role')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@email.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return an account on loadByToken if use is admin', async () => {
      const sut = mockSut()
      const fakeAccountObj = {
        ...mockFakeAccountDTO(),
        accessToken: 'any_token',
        role: 'admin'
      }
      const resultAccount = await accountsCollection.insertOne(fakeAccountObj)
      const fakeAccount = resultAccount.ops[0]
      expect(fakeAccount.accessToken).toBeTruthy()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@email.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return null on loadByToken with invalid role', async () => {
      const sut = mockSut()
      const fakeAccountObj = {
        ...mockFakeAccountDTO(),
        accessToken: 'any_token'
      }
      const resultAccount = await accountsCollection.insertOne(fakeAccountObj)
      const fakeAccount = resultAccount.ops[0]
      expect(fakeAccount.accessToken).toBeTruthy()
      const account = await sut.loadByToken('any_token', 'any_role')
      expect(account).toBeFalsy()
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = mockSut()
      const account = await sut.loadByToken('any_token', 'any_role')
      expect(account).toBeFalsy()
    })
  })
})
