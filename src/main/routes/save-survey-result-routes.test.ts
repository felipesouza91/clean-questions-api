import { Collection } from 'mongodb'
import request from 'supertest'

import { MongoHelper } from '@src/infra/db/mongodb/helpers/MongoHelper'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { ISurveyModel } from '@src/domain/models/ISurveyModel'

let surveyCollection: Collection
let accountCollection: Collection
let saveSurveyResultCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const account = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    role: 'admin'

  })
  const id = account.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({ _id: id }, { $set: { accessToken } })
  return accessToken
}

const mockSurvey = async (): Promise<ISurveyModel> => {
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
    ]
  })
  return survey.ops[0] && MongoHelper.map(survey.ops[0])
}

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

    test('Should return 200 on save survey result success', async () => {
      const survey = await mockSurvey()
      const accessToken = await mockAccessToken()
      await request(app)
        .put(`/api/surveys/${survey.id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer'
        })
        .expect(200)
    })
  })
})
