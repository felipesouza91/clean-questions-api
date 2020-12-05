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
      const surveyResult = await sut.save({
        accountId: account.id,
        surveyId: survey.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
    })
    test('Should update survey result if its not new', async () => {
      const account = await mockFakeAccount()
      const survey = await mockFakeSurvey()
      await mockFakeSurveyResult(account.id, survey.id, 'any_answer')
      const sut = mockSut()
      const surveyResult = await sut.save({
        accountId: account.id,
        surveyId: survey.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
    })
  })
})
