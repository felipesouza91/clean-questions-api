import { IAddSurveyRepository } from '@src/data/protocols/db/survey/IAddSurveyRepository'
import { ILoadSurveyByIdRepository } from '@src/data/protocols/db/survey/ILoadSurveyByIdRepository'
import { ILoadSurveysRepository } from '@src/data/protocols/db/survey/ILoadSurveysRepository'
import { ISurveyModel } from '@src/domain/models/ISurveyModel'
import { IAddSurveyModel } from '@src/domain/usecases/survey/IAddSurvey'
import { ObjectID } from 'mongodb'
import { MongoHelper } from '../helpers/MongoHelper'

export class SurveyMongoRepository implements IAddSurveyRepository, ILoadSurveysRepository, ILoadSurveyByIdRepository {
  async add (data: IAddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(data)
    return await Promise.resolve()
  }

  async loadAll (): Promise<ISurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys: ISurveyModel[] = await surveyCollection.find().toArray()
    return surveys && MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<ISurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectID(id) })

    return survey && MongoHelper.map(survey)
  }
}
