
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadSurveyById,
  forbidden,
  InvalidParamError,
  serverError
} from './SaveSurveyResultController.protocols'

interface ISaveSurveyResultControllerProps {
  loadSurveyById: ILoadSurveyById
}

export class SaveSurveyResultController implements IController {
  private readonly loadSurveyById: ILoadSurveyById
  constructor (props: ISaveSurveyResultControllerProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { params ,body } = httpRequest
      const survey = await this.loadSurveyById.loadById(params.survey_id)
      if (!survey) {
        return forbidden(new InvalidParamError('survey_id'))
      }
      const validAnswer = survey.answers.find(item => item.answer === body.answer)
      if (!validAnswer) {
        return forbidden(new InvalidParamError('answer'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
