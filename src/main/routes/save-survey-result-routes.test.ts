import { Collection } from 'mongodb'
import request from 'supertest'

import { MongoHelper } from '@src/infra/db/mongodb/helpers/MongoHelper'
import app from '../config/app'

let surveyCollection: Collection
let accountCollection: Collection
let saveSurveyResultCollection: Collection

describe('Save Survey Result Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    accountCollection = await MongoHelper.getCollection('accounts')
    saveSurveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
    await saveSurveyResultCollection.deleteMany({})
  })
  describe('POST /surveys/:survey_id/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_survey_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
  })
})
