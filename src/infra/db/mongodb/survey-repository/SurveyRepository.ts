import { IAddSurveyRepository } from '../../../../data/protocols/db/survey/IAddSurveyRepository'
import { IAddSurveyModel } from '../../../../domain/usecases/IAddSurvey'
import { MongoHelper } from '../helpers/MongoHelper'

export class SurveyMongoRepository implements IAddSurveyRepository {
  async add (data: IAddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('survey')
    await surveyCollection.insertOne(data)
    return await Promise.resolve()
  }
}
