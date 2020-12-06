
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadSurveyById,
  forbidden,
  serverError,
  InvalidParamError
} from './LoadSurveyResultController.protocols'

interface ILoadSurveyResultControllerProps {
  loadSurveyById: ILoadSurveyById
}

export class LoadSurveyResultController implements IController {
  private readonly loadSurveyById: ILoadSurveyById
  constructor (props: ILoadSurveyResultControllerProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { params } = httpRequest
      const survey = await this.loadSurveyById.loadById(params.surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
