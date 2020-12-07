import { IAddSurveyRepository } from '@src/data/protocols/db/survey/IAddSurveyRepository'
import { ILoadSurveyByIdRepository } from '@src/data/protocols/db/survey/ILoadSurveyByIdRepository'
import { ILoadSurveysRepository } from '@src/data/protocols/db/survey/ILoadSurveysRepository'
import { ISurveyModel } from '@src/domain/models/ISurveyModel'
import { IAddSurveyDTO } from '@src/domain/usecases/survey/IAddSurvey'
import { ObjectID } from 'mongodb'
import { MongoHelper, QueryBuilder } from '../helpers'

export class SurveyMongoRepository implements IAddSurveyRepository, ILoadSurveysRepository, ILoadSurveyByIdRepository {
  async add (data: IAddSurveyDTO): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(data)
    return await Promise.resolve()
  }

  async loadAll (accountId: string): Promise<ISurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const query = new QueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result'
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [{
            $size: {
              $filter: {
                input: '$result',
                as: 'item',
                cond: {
                  $eq: ['$$item.accountId', new ObjectID(accountId)]
                }
              }
            }
          }, 1]
        }
      }).build()
    const surveys: ISurveyModel[] = await surveyCollection.aggregate(query).toArray()
    return surveys && MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<ISurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectID(id) })

    return survey && MongoHelper.map(survey)
  }
}
