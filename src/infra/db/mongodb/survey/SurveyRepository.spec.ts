import { Collection, ObjectID } from 'mongodb'
import { MongoHelper } from '../helpers/MongoHelper'
import { SurveyMongoRepository } from './SurveyRepository'
import { mockFakeSurveyDTO } from '@src/domain/test'
import { ISurveyResultModel } from '@src/domain/models/ISurveyResultModel'
import { IAccountModel } from '@src/domain/models/IAccountModel'
import { ISurveyModel } from '@src/domain/models/ISurveyModel'

let surveyCollection: Collection
let accountColletion: Collection
let surveyResultCollection: Collection

const mockSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

const mockFakeAccount = async (): Promise<IAccountModel> => {
  const account = await accountColletion.insertOne({
    name: 'any_name',
    email: 'any_email@email.com}',
    password: 'any_password'
  })
  return account.ops[0] && MongoHelper.map(account.ops[0])
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

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    accountColletion = await MongoHelper.getCollection('accounts')
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyCollection.deleteMany({})
    await accountColletion.deleteMany({})
    await surveyResultCollection.deleteMany({})
  })

  describe('addSurveys()', () => {
    test('Should add a survey on success', async () => {
      const sut = mockSut()
      await sut.add(mockFakeSurveyDTO())
      const survey = await surveyCollection.findOne({ question: mockFakeSurveyDTO().question })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll', () => {
    test('should load all survey', async () => {
      const account = await mockFakeAccount()
      const firstSurvey = await mockFakeSurvey()
      const secondSurvey = await mockFakeSurvey()
      await mockFakeSurveyResult(account.id, firstSurvey.id, 'any_answer')
      const sut = mockSut()
      const surveys = await sut.loadAll(account.id)
      expect(surveys).toBeTruthy()
      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(firstSurvey.question)
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].question).toBe(secondSurvey.question)
      expect(surveys[1].didAnswer).toBe(false)
    })
    test('should empty list of surveys', async () => {
      const account = await mockFakeAccount()
      const sut = mockSut()
      const surveys = await sut.loadAll(account.id)
      expect(surveys).toBeTruthy()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('should load by id', async () => {
      const result = await surveyCollection.insertOne(mockFakeSurveyDTO())
      const id = result.ops[0]._id
      const sut = mockSut()
      const survey = await sut.loadById(id)
      expect(survey).toBeTruthy()
      expect(survey.id).toEqual(id)
    })
  })
})
