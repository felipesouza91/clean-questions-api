import { IAddSurveyRepository } from '@src/data/protocols/db/survey/IAddSurveyRepository'
import { ILoadSurveysRepository } from '@src/data/protocols/db/survey/ILoadSurveysRepository'
import { ISurveyModel } from '@src/domain/models/ISurveyModel'
import { IAddSurveyModel } from '@src/domain/usecases/IAddSurvey'
import { MongoHelper } from '../helpers/MongoHelper'

export class SurveyMongoRepository implements IAddSurveyRepository, ILoadSurveysRepository {
  async add (data: IAddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(data)
    return await Promise.resolve()
  }

  async loadAll (): Promise<ISurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys: ISurveyModel[] = await surveyCollection.find().toArray()
    return surveys
  }
}
