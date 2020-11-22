import { Collection } from 'mongodb'
import { IAddSurveyModel } from '../../../../domain/usecases/IAddSurvey'
import { MongoHelper } from '../helpers/MongoHelper'
import { SurveyMongoRepository } from './SurveyRepository'

let surveyCollection: Collection

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}
const makeFakeAnswaer = (): IAddSurveyModel => ({
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

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('addSurveys()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut()
      await sut.add(makeFakeAnswaer())

      const survey = await surveyCollection.findOne({ question: makeFakeAnswaer().question })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll', () => {
    test('should load all survey', async () => {
      await surveyCollection.insertOne(makeFakeAnswaer())
      await surveyCollection.insertOne(makeFakeAnswaer())
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys).toBeTruthy()
      expect(surveys.length).toBe(2)
    })
    test('should empty list of surveys', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys).toBeTruthy()
      expect(surveys.length).toBe(0)
    })
  })
})
