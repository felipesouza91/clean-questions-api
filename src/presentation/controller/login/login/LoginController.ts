import {
  IAuthentication,
  IValidation,
  IController,
  IHttpRequest,
  IHttpResponse
} from './LoginController.protocols'
import { badRequest, serverError, unauthorized, ok } from '@src/presentation/helpers/http/HttpHelper'

interface ILoginControllerProps {
  validation: IValidation
  authentication: IAuthentication
}

export class LoginController implements IController {
  private readonly validation: IValidation
  private readonly authentication: IAuthentication
  constructor (props: ILoginControllerProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const authenticationModel = await this.authentication.auth({ email,password })
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
