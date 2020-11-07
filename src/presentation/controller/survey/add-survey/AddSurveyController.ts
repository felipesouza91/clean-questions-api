import { IValidation } from '../../../protocols'
import { IController, IHttpRequest, IHttpResponse } from './AddSurveyController.protocols'

interface IAddSurveyControllerProps {
  validation: IValidation
}

export class AddSurveyController implements IController {
  private readonly validation: IValidation

  constructor (props: IAddSurveyControllerProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    this.validation.validate(httpRequest.body)
    return await new Promise((resolve) => resolve(null))
  }
}
