import { Collection } from 'mongodb'
import { IAddSurveyModel } from '@src/domain/usecases/survey/IAddSurvey'
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
      const firstSurvey = await surveyCollection.insertOne(makeFakeAnswaer())
      const secondSurvey = await surveyCollection.insertOne(makeFakeAnswaer())
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys).toBeTruthy()
      expect([firstSurvey.ops[0]._id, secondSurvey.ops[0]._id])
        .toEqual(expect.arrayContaining([surveys[0].id]))
      expect([firstSurvey.ops[0]._id, secondSurvey.ops[0]._id])
        .toEqual(expect.arrayContaining([surveys[1].id]))
    })
    test('should empty list of surveys', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys).toBeTruthy()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('should load by id', async () => {
      const result = await surveyCollection.insertOne(makeFakeAnswaer())
      const id = result.ops[0]._id
      const sut = makeSut()
      const survey = await sut.loadById(id)
      expect(survey).toBeTruthy()
      expect(survey.id).toEqual(id)
    })
  })
})
