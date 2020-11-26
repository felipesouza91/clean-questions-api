
import { ISaveSurveyResultRepository } from '@src/data/protocols/db/survey-result/ISaveSurveyResultRepository'
import { ISurveyResultModel } from '@src/domain/models/ISurveyResultModel'
import { IAddSurveyResultModel } from '@src/domain/usecases/survey-result/ISaveSurveyResult'
import { MongoHelper } from '../helpers/MongoHelper'

export class SurveyResultMongoRepository implements ISaveSurveyResultRepository {
  async save ({ accountId, surveyId, answer, date }: IAddSurveyResultModel): Promise<ISurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const { value: surveyResult } = await surveyResultCollection.findOneAndUpdate({
      accountId,surveyId
    }, {
      $set: { answer, date }
    },{
      upsert: true,
      returnOriginal: false
    })
    return surveyResult && MongoHelper.map(surveyResult)
  }
}
