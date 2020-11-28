
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadSurveyById,
  forbidden,
  InvalidParamError,
  ISaveSurveyResult,
  serverError,
  ok
} from './SaveSurveyResultController.protocols'

interface ISaveSurveyResultControllerProps {
  loadSurveyById: ILoadSurveyById
  saveResultSurvey: ISaveSurveyResult
}

export class SaveSurveyResultController implements IController {
  private readonly loadSurveyById: ILoadSurveyById
  private readonly saveResultSurvey: ISaveSurveyResult
  constructor (props: ISaveSurveyResultControllerProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { params ,body, accountId } = httpRequest
      const survey = await this.loadSurveyById.loadById(params.survey_id)
      if (!survey) {
        return forbidden(new InvalidParamError('survey_id'))
      }
      const validAnswer = survey.answers.find(item => item.answer === body.answer)
      if (!validAnswer) {
        return forbidden(new InvalidParamError('answer'))
      }
      const saveSurveyResult = await this.saveResultSurvey.save({
        surveyId: params.survey_id,
        accountId,
        answer: body.answer,
        date: new Date()
      })
      return ok(saveSurveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
