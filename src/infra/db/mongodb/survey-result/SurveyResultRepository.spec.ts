import { IAccountModel } from '@src/domain/models/IAccountModel'
import { ISurveyModel } from '@src/domain/models/ISurveyModel'
import { ISurveyResultModel } from '@src/domain/models/ISurveyResultModel'
/* import { ISurveyResultModel } from '@src/domain/models/ISurveyResultModel' */
import { Collection, ObjectID } from 'mongodb'
import { MongoHelper } from '../helpers/MongoHelper'
import { SurveyResultMongoRepository } from './SurveyResultRepository'

let surveyCollection: Collection
let accountsCollection: Collection
let surveyResultCollection: Collection

const mockSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const mockFakeAccount = async (): Promise<IAccountModel> => {
  const account = await accountsCollection.insertOne({
    name: 'any_name',
    email: 'any_email@email.com}',
    password: 'any_password'
  })
  return account.ops[0] && MongoHelper.map(account.ops[0])
}

const mockFakeSurvey = async (): Promise<ISurveyModel> => {
  const survey = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      },
      {
        answer: 'other_answer'
      }
    ],
    date: new Date()
  })
  return survey.ops[0] && MongoHelper.map(survey.ops[0])
}

const mockFakeSurveyResult = async (accountId: string, surveyId: string, answer: string): Promise<ISurveyResultModel> => {
  const surveyResult = await surveyResultCollection.insertOne({
    accountId: new ObjectID(accountId),
    surveyId: new ObjectID(surveyId),
    answer,
    date: new Date()
  })
  return surveyResult.ops[0] && MongoHelper.map(surveyResult.ops[0])
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountsCollection = await MongoHelper.getCollection('accounts')
    surveyCollection = await MongoHelper.getCollection('surveys')
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await accountsCollection.deleteMany({})
    await surveyCollection.deleteMany({})
    await surveyResultCollection.deleteMany({})
  })

  describe('addSurveys()', () => {
    test('Should add a survey result if its new', async () => {
      const account = await mockFakeAccount()
      const survey = await mockFakeSurvey()
      await mockFakeSurveyResult(account.id, survey.id, 'any_answer')
      const sut = mockSut()
      await sut.save({
        accountId: account.id,
        surveyId: survey.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.findOne({
        accountId: account.id,
        surveyId: survey.id
      })
      expect(surveyResult).toBeTruthy()
    })

    test('Should update survey result if its not new', async () => {
      const account = await mockFakeAccount()
      const survey = await mockFakeSurvey()
      await mockFakeSurveyResult(account.id, survey.id, 'any_answer')
      const sut = mockSut()
      await sut.save({
        accountId: account.id,
        surveyId: survey.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.find({
        accountId: account.id,
        surveyId: survey.id
      }).toArray()
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
    })
  })

  describe('loadBySurveyId', () => {
    test('Should load a survey result by surveyid', async () => {
      const account = await mockFakeAccount()
      const account2 = await mockFakeAccount()
      const survey = await mockFakeSurvey()
      await mockFakeSurveyResult(account.id, survey.id, 'any_answer')
      await mockFakeSurveyResult(account2.id, survey.id, 'other_answer')
      const sut = mockSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, account.id)
      expect(surveyResult).toBeTruthy()

      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].answer).toEqual('any_answer')
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)
      expect(surveyResult.answers[0].percent).toBe(50)

      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[1].answer).toEqual('other_answer')
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })
    test('Should load a survey result by surveyid with account2', async () => {
      const account = await mockFakeAccount()
      const account2 = await mockFakeAccount()
      const account3 = await mockFakeAccount()
      const survey = await mockFakeSurvey()
      await mockFakeSurveyResult(account.id, survey.id, 'any_answer')
      await mockFakeSurveyResult(account2.id, survey.id, 'other_answer')
      await mockFakeSurveyResult(account3.id, survey.id, 'other_answer')
      const sut = mockSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, account2.id)
      expect(surveyResult).toBeTruthy()

      expect(surveyResult.surveyId).toEqual(survey.id)

      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].answer).toEqual('other_answer')
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)
      expect(surveyResult.answers[0].percent).toBe(67)

      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(33)
      expect(surveyResult.answers[1].answer).toEqual('any_answer')
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })
  })
})
