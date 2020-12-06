
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadSurveyById
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
    const { params } = httpRequest
    await this.loadSurveyById.loadById(params.surveyId)
    return null
  }
}
