
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadSurveyById,
  ILoadSurveyResult,
  forbidden,
  serverError,
  InvalidParamError
} from './LoadSurveyResultController.protocols'

interface ILoadSurveyResultControllerProps {
  loadSurveyById: ILoadSurveyById
  loadSurveyResult: ILoadSurveyResult
}

export class LoadSurveyResultController implements IController {
  private readonly loadSurveyById: ILoadSurveyById
  private readonly loadSurveyResult: ILoadSurveyResult
  constructor (props: ILoadSurveyResultControllerProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { params, accountId } = httpRequest
      const survey = await this.loadSurveyById.loadById(params.surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      await this.loadSurveyResult.load(params.surveyId, accountId)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
