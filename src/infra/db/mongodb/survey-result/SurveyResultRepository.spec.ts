import { IAccountModel } from '@src/domain/models/IAccountModel'
import { ISurveyModel } from '@src/domain/models/ISurveyModel'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/MongoHelper'
import { SurveyResultMongoRepository } from './SurveyResultRepository'

let surveyCollection: Collection
let accountsCollection: Collection
let surveyResultCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeFakeAccount = async (): Promise<IAccountModel> => {
  const account = await accountsCollection.insertOne({
    name: 'any_name',
    email: 'any_email@email.com}',
    password: 'any_password'
  })
  return account.ops[0] && MongoHelper.map(account.ops[0])
}

const makeFakeSurvey = async (): Promise<ISurveyModel> => {
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
    accountsCollection = await MongoHelper.getCollection('accounts')
    surveyCollection = await MongoHelper.getCollection('surveys')
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await accountsCollection.deleteMany({})
    await surveyCollection.deleteMany({})
    await surveyResultCollection.deleteMany({})
  })

  describe('addSurveys()', () => {
    test('Should add a survey result if its new', async () => {
      const account = await makeFakeAccount()
      const survey = await makeFakeSurvey()

      const sut = makeSut()
      const surveyResult = await sut.save({
        accountId: account.id,
        surveyId: survey.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })
  })
})
