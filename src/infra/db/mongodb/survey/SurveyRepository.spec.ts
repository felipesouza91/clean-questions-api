import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/MongoHelper'
import { SurveyMongoRepository } from './SurveyRepository'
import { mockFakeSurveyDTO } from '@src/domain/test'

let surveyCollection: Collection

const mockSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
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
    await surveyCollection.deleteMany({})
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
      const firstSurvey = await surveyCollection.insertOne(mockFakeSurveyDTO())
      const secondSurvey = await surveyCollection.insertOne(mockFakeSurveyDTO())
      const sut = mockSut()
      const surveys = await sut.loadAll()
      expect(surveys).toBeTruthy()
      expect([firstSurvey.ops[0]._id, secondSurvey.ops[0]._id])
        .toEqual(expect.arrayContaining([surveys[0].id]))
      expect([firstSurvey.ops[0]._id, secondSurvey.ops[0]._id])
        .toEqual(expect.arrayContaining([surveys[1].id]))
    })
    test('should empty list of surveys', async () => {
      const sut = mockSut()
      const surveys = await sut.loadAll()
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
