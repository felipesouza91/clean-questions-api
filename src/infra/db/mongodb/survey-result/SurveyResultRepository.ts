
import { ISaveSurveyResultRepository } from '@src/data/protocols/db/survey-result/ISaveSurveyResultRepository'
import { ISurveyResultModel } from '@src/domain/models/ISurveyResultModel'
import { IAddSurveyResultDTO } from '@src/domain/usecases/survey-result/ISaveSurveyResult'
import { MongoHelper } from '../helpers/MongoHelper'

export class SurveyResultMongoRepository implements ISaveSurveyResultRepository {
  async save ({ accountId, surveyId, answer, date }: IAddSurveyResultDTO): Promise<ISurveyResultModel> {
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
